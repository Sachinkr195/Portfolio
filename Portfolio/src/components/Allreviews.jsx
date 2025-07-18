import React, { useState, useMemo, useContext } from 'react';

import arrowright from '../assets/arrow-right.png';
import arrowleft   from '../assets/arrow-left.png';
import graystar    from '../assets/graystar.png';
import yellow      from '../assets/favorite.png';
import { AppContext } from '../context/Appcontext';

const Allreviews = () => {
  const { reviews } = useContext(AppContext);

  // make a *reversed* copy so newest reviews come first
  const orderedReviews = useMemo(() => [...(reviews || [])].reverse(), [reviews]);


  const [index, setIndex] = useState(0);
  const visible = 3;

  const canPrev = index > 0;
  const canNext = index < orderedReviews.length - visible;

  const prev = () => canPrev && setIndex(i => i - 1);
  const next = () => canNext && setIndex(i => i + 1);

  return (
    <div className="flex items-center justify-center px-6 py-8 text-white gap-4 bg-black">
      {/* Left arrow */}
      <button onClick={prev} disabled={!canPrev}>
        <img
          src={arrowleft}
          alt="left"
          className="bg-gray-900 hover:bg-gray-700 p-2 rounded-full disabled:opacity-30"
        />
      </button>

      {/* Review cards */}
      <div className="flex gap-6 overflow-hidden">
        {orderedReviews
          .slice(index, index + visible)
          .map((rev, i) => {
            const middle = i === 1; // centre card of the 3 showing
            return (
              <div
                key={rev._id}
                className={`w-[300px] p-4 rounded-2xl transition-transform duration-300 ${
                  middle ? 'scale-105 opacity-100' : 'scale-95 opacity-60'
                } bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-md
                   border border-gray-700 hover:border-purple-400 shadow-md hover:shadow-purple-500/30`}
              >
                <h3 className="font-semibold text-lg mb-1">
                  {rev.user?.name || rev.email}
                </h3>
                <hr className="border-gray-600 mb-2" />

                {/* stars */}
                <div className="mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <img
                      key={idx}
                      src={idx < rev.rating ? yellow : graystar}
                      alt="star"
                      className="inline w-4"
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-300">{rev.review}</p>
              </div>
            );
          })}
      </div>

      {/* Right arrow */}
      <button onClick={next} disabled={!canNext}>
        <img
          src={arrowright}
          alt="right"
          className="bg-gray-900 hover:bg-gray-700 p-2 rounded-full disabled:opacity-30"
        />
      </button>
    </div>
  );
};

export default Allreviews;
