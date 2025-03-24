import { useState, useEffect } from "react";


const TaskComments = ({ taskId }) => {
  const [comments, setComments] = useState([]); // State to store the list of comments
  const [newComment, setNewComment] = useState(""); // State to store the new comment input

  /**
   * Loads comments from localStorage when the component mounts or when the taskId changes.
   */
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${taskId}`)) || [];
    setComments(Array.isArray(storedComments) ? storedComments : []); // Ensure the data is an array
  }, [taskId]);

  /**
   * Handles adding a new comment.
   * Updates the comments state and saves the updated list to localStorage.
   * Clears the input field after adding the comment.
   */
  const handleAddComment = () => {
    if (!newComment.trim()) return; // Prevent adding empty comments

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${taskId}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  return (
    <div>
      <h4>Comments</h4>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add</button>
    </div>
  );
};

export default TaskComments;
