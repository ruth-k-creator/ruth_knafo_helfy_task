import React, { useState, useRef, useEffect } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks, onEdit, onDelete, onToggle, editingId, onSetEditingId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const length = tasks.length;
  // double the list so we can loop
  const displayList = length > 0 ? [...tasks, ...tasks] : [];
  const totalSlides = displayList.length;

  // reset index if list length changes
  useEffect(() => {
    setCurrentIndex((i) => (i >= length ? 0 : i));
  }, [length]);

  const goTo = (nextIndex) => {
    if (length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(nextIndex);
  };

  const handleNext = () => {
    if (length <= 1) return;
    const next = currentIndex + 1;
    if (next < length) {
      goTo(next);
    } else {
      // wrap to first
      goTo(length);
    }
  };

  const handlePrev = () => {
    if (length <= 1) return;
    if (currentIndex > 0) {
      goTo(currentIndex - 1);
    } else {
      // from first go to last
      setIsTransitioning(false);
      setCurrentIndex(length);
      requestAnimationFrame(() => {
        setIsTransitioning(true);
        setCurrentIndex(length - 1);
      });
    }
  };

  // after animation done, snap back to real index
  const handleTransitionEnd = () => {
    if (currentIndex === length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  if (length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks to show. Add a task above or change the filter.</p>
      </div>
    );
  }

  const translateX = totalSlides > 0 ? -(currentIndex * 100) : 0;

  return (
    <section className="task-list">
      <div className="task-list-carousel" ref={containerRef}>
        <button
          type="button"
          className="carousel-btn carousel-prev"
          onClick={handlePrev}
          disabled={length <= 1}
        >
          ‹
        </button>

        <div className="carousel-viewport">
          <div
            ref={trackRef}
            className="carousel-track"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: isTransitioning ? 'transform 0.4s ease-in-out' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {displayList.map((task, i) => (
              <div key={`slide-${task.id}-${i}`} className="carousel-slide">
                <TaskItem
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggle={onToggle}
                  isEditing={editingId === task.id}
                  onSetEditing={onSetEditingId}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="carousel-btn carousel-next"
          onClick={handleNext}
          disabled={length <= 1}
        >
          ›
        </button>
      </div>

      {length > 1 && (
        <div className="carousel-dots">
          {tasks.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot ${i === currentIndex % length ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;