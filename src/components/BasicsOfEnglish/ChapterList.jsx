import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar"; // import it here
import "./ChapterList.css";
import { fetchBasicsChapter } from "../../store/basicSlice";
import { useDispatch, useSelector } from "react-redux";



const ChapterList = () => {
  const dispatch = useDispatch();
  const { chapters, loading:status, error } = useSelector((state) => state.basics);

  useEffect(() => {
    if (status && chapters.length === 0) {
      dispatch(fetchBasicsChapter());
    }
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  
  return (
    <div className="chapter-list-container">
      <h2 className="chapter-heading">Upcoming Chapters</h2>
      <ul className="chapter-list">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="chapter-card">
            <div className="chapter-info">
              <div className="chapter-title">
                <div>
                    <div className='progress-bar'>
                    <span className="chapter-number">Chapter {chapter.id}</span>
                    <ProgressBar percentage={chapter.progress} showProgressLabel={true} />
                    </div>
                  

                  <h3 className="chapter-name">
                    <img
                      src={chapter.icon}
                      alt="icon"
                      className="chapter-icon"
                    />
                    <span className='chapter-title-inner'>{chapter.title}</span>
                  </h3>
                  <p className="chapter-description">{chapter.description}</p>
                </div>
              </div>
            </div>
            <Link to={`/basics/chapter/${chapter.id}`}>
              <button className="chapter-view-button">View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
