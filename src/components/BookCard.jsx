function BookCard({book}) {
  const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`
  return (
    <div 
      className="bg-white/80 backdrop-blur-md rounded-2xl p-4
        border border-slate-100 shadow-xl shadow-slate-200/50 
        transition-all duration-500 ease-out 
        hover:shadow-2xl hover:shadow-slate-300/60 hover:-translate-y-1"
    >
      <img src={coverUrl} alt={`${book.title} cover image`} 
          className="mb-6 w-max bg-linear-45 from-sky-400 to-indigo-500 
          rounded-xl shadow-lg shadow-sky-200 flex items-center justify-center"/>
      <h4 className="text-[0.8rem] font-bold text-slate-800 tracking-tight mb-2">{book.title}</h4>
      <p className="text-[0.7rem]  slate-500 leading-relaxed">By {book.authorsNames.join(', ')}</p>
      {book.rating && <p className="text-[0.7rem]  slate-500 leading-relaxed">{book.rating} Ratings</p> }
      {book.wantToRead && <p className="text-[0.7rem]  slate-500 leading-relaxed">{book.wantToRead} people want to read it.</p>}
      <p className="text-[0.6rem] leading-relaxed">First Published in {book.firstPublishYear}</p>
    </div>
  )
}

export default BookCard;