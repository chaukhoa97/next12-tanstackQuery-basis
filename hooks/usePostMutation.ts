import { useMutation, useQueryClient } from '@tanstack/react-query'

const usePostMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (newPost) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => res.json()),
    // `variables`: what we passed to the `mutation.mutate` function
    onMutate: (variables) => {
      // Old Optimistic Updates 1: Ta có thể thêm data mới vào cache để show lập tức ngay trên UI khi vừa submit (không cần chờ refetch mới thấy data mới)
      queryClient.setQueryData<any[]>(['posts'], (old) => [...old, variables])
    },
    // `data` is the response from the server (Tab Network -> Response)
    onSuccess: (data, variables) => {
      console.log(data, variables)
      // Old Optimistic Updates 2: Khi success thì sẽ set lại theo `data` trả về từ server
      queryClient.setQueryData<any[]>(['posts'], (old) => [...old, data])
      // Old Optimistic Updates 3: Cuối cùng là refetch lại data từ server cho chắc
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return mutation
}

export default usePostMutation
