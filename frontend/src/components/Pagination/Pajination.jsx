import "./pagination.css"


export const Pagination = (pages, currentPage,setCurrentpage) => {
    const generatedPages = [];
    for(let i = 1; i <= pages; i++ ){
        generatedPages.Push(i);
    }
    return(
        <div className="pagination">
            <div className="page previous">previous</div>
            {generatedPages.map(page => (
                <div onClick={() => setCurrentpage(page)}
                key={page} className="page">{page}</div>
                
            ))}
            <div className="page next">next</div>
        </div>
    )
}