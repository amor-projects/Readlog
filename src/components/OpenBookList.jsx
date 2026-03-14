import BookCard from './BookCard.jsx';
function OpenBookList({id, books, title}) {
  return (
    <div id={id}>
      <h2 className="text-2xl text-black-900 font-bold tracking-tight m-4">{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {books && books.map(book => (
          <BookCard book={book} key={book.key}/>
          ))
        }
      </div>
    </div>
  )
}

export default OpenBookList;