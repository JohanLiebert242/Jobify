//Libraries
import { useLocation, useNavigate } from "react-router-dom";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

//Component

//Context
import { useAllJobsContext } from "../pages/AllJobs";

//Wrapper
import Wrapper from "../assets/wrappers/PageBtnContainer";

function PageBtnContainer() {
    const navigate = useNavigate();
    const {
        data: { numOfPages, currentPage },
    } = useAllJobsContext();
    const pageNumbers = Array.from({ length: numOfPages }, (_id, index) => {
        return index + 1;
    });

    const { search, pathname } = useLocation();

    const handlePageNumber = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", pageNumber);
        //We set the request every time we make request to '/jos'
        //If we pass page value, it will get that to handle the logic
        navigate(`${pathname}?${searchParams.toString()}`);
    };

    const addPageButton = ({ pageNumber, activeClass }) => {
        return (
            <button
                onClick={() => handlePageNumber(pageNumber)}
                key={pageNumber}
                className={`btn page-btn ${activeClass && "active"}`}
            >
                {pageNumber}
            </button>
        );
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        //First Btn
        pageButtons.push(
            addPageButton({
                pageNumber: 1,
                activeClass: currentPage === 1,
            })
        );

        //Dots
        if(currentPage > 3) {
            pageButtons.push(<span className="page-btn dots" key="dots-1">. . .</span>)
        }

        //One before current page
        if(currentPage !== 1 && currentPage !== 2) {
            pageButtons.push(addPageButton({
                pageNumber: currentPage - 1,
                activeClass: false
            }))
        }

        if(currentPage !== 1 && currentPage != 10) {
            //Current page
            pageButtons.push(addPageButton({
                pageNumber: currentPage,
                activeClass: true
            }))
        }

        //One after current page
        if(currentPage !== numOfPages && currentPage !== numOfPages -1) {
            pageButtons.push(addPageButton({
                pageNumber: currentPage + 1,
                activeClass: false
            }))
        }

        //Dots
        if(currentPage < numOfPages - 2) {
            pageButtons.push(<span className="page-btn dots" key="dots+1">. . .</span>)
        }


        //Last btn
        pageButtons.push(
            addPageButton({
                pageNumber: numOfPages,
                activeClass: currentPage === numOfPages,
            })
        );
        return pageButtons;
    };

    return (
        <Wrapper>
            <button
                onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) {
                        prevPage = numOfPages;
                    }
                    handlePageNumber(prevPage);
                }}
                className="btn prev-btn"
            >
                <HiChevronDoubleLeft /> prev
            </button>
            <div className="btn-container">{renderPageButtons()}</div>
            <button
                onClick={() => {
                    let nextPage = currentPage + 1;
                    if (nextPage > numOfPages) {
                        nextPage = 1;
                    }
                    handlePageNumber(nextPage);
                }}
                className="btn next-btn"
            >
                Next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    );
}

export default PageBtnContainer;
