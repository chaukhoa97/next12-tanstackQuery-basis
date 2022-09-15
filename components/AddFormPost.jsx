import usePostMutation from '../lib/queries/usePostMutation'

const AddFormPost = () => {
  const mutation = usePostMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title } = e.target.elements
    mutation.mutate({
      title: title.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      {mutation.isLoading
        ? 'Adding Post...'
        : mutation.isError
        ? 'Error'
        : mutation.isSuccess && 'Added Post!'}
    </form>
  )
}

export default AddFormPost
