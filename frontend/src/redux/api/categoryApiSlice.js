import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCategory:builder.mutation({
            query:(newCategory)=>({
                url:`${CATEGORY_URL}`,
                method:'POST',
                body:newCategory,
            }),
            async onQueryStarted(newCategory, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdCategory } = await queryFulfilled;
                    dispatch(
                        categoryApiSlice.util.updateQueryData(
                            'fetchCategories',
                            undefined,
                            (draft) => {
                                draft.push(createdCategory);
                            }
                        )
                    );
                } catch {
                    toast.error('Failed to add category to UI');
                }
            },
        }),

        updateCategory:builder.mutation({
            query:({categoryId,updatedCategory })=>({
                url:`${CATEGORY_URL}/${categoryId}`,
                method:'PUT',
                body:updatedCategory,
            }),
            async onQueryStarted({ categoryId, updatedCategory }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        categoryApiSlice.util.updateQueryData(
                            'fetchCategories',
                            undefined,
                            (draft) => {
                                const index = draft.findIndex((cat) => cat._id === categoryId);
                                if (index !== -1) {
                                    draft[index] = { ...draft[index], ...updatedCategory };
                                }
                            }
                        )
                    );
                } catch {
                    toast.error('Failed to update category in UI');
                }
            },
        }),

        deleteCategory:builder.mutation({
            query:({categoryId})=>({
                url:`${CATEGORY_URL}/${categoryId}`,
                method:'DELETE',
            }),
            async onQueryStarted({ categoryId }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        categoryApiSlice.util.updateQueryData(
                            'fetchCategories',
                            undefined,
                            (draft) => {
                                return draft.filter((category) => category._id !== categoryId);
                            }
                        )
                    );
                } catch {
                    toast.error("Failed to update categories after deletion");
                }
            },
        }),
        fetchCategories:builder.query({
            query:()=>`${CATEGORY_URL}/categories`,
            }),
    }),
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
}=categoryApiSlice;