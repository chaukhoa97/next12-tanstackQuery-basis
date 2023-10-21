import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const AddFormPost = () => {
  const mutation = useMutation({
    mutationFn: (newPost: any) =>
      axios.post('https://jsonplaceholder.typicode.com/posts', newPost),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title } = e.target.elements // Các child của <form>, ở đây là <input> with `name="title"`
    mutation.mutate({ title: title.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-white text-sm font-bold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
      {mutation.isPending
        ? 'Adding Post...'
        : mutation.isError
        ? 'Error'
        : mutation.isSuccess && 'Added Post!'}
    </form>
  )
}

export default AddFormPost
