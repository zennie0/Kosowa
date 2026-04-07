import { useState, useRef, useEffect } from 'react'
import styles from './CommentSection.module.css'

const getInitial = (name) => name.charAt(0).toUpperCase()

const getAvatarColor = (name) => {
  const colors = ['#c8922a', '#5a7a9a', '#7a5a9a', '#5a9a7a', '#9a5a5a', '#7a7a5a']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const MOCK_USERS = ['aryan', 'mei', 'riya', 'samir', 'kira', 'dev', 'nomad', 'leila']

const CommentInput = ({ onSubmit, placeholder = 'Write a comment...', buttonLabel = 'Post' }) => {
  const [text, setText] = useState('')
  const [showMentions, setShowMentions] = useState(false)
  const [mentionQuery, setMentionQuery] = useState('')
  const [mentionStart, setMentionStart] = useState(null)
  const textareaRef = useRef(null)

  const filteredUsers = MOCK_USERS.filter(u =>
    u.toLowerCase().startsWith(mentionQuery.toLowerCase())
  )

  const handleChange = (e) => {
    const val = e.target.value
    setText(val)

    const cursor = e.target.selectionStart
    const textUpToCursor = val.slice(0, cursor)
    const atIndex = textUpToCursor.lastIndexOf('@')

    if (atIndex !== -1) {
      const query = textUpToCursor.slice(atIndex + 1)
      if (!query.includes(' ')) {
        setMentionStart(atIndex)
        setMentionQuery(query)
        setShowMentions(true)
        return
      }
    }

    setShowMentions(false)
    setMentionQuery('')
    setMentionStart(null)
  }

  const insertMention = (username) => {
    const before = text.slice(0, mentionStart)
    const after = text.slice(mentionStart + 1 + mentionQuery.length)
    const newText = `${before}@${username} ${after}`
    setText(newText)
    setShowMentions(false)
    setMentionQuery('')
    setMentionStart(null)
    textareaRef.current?.focus()
  }

  const handleSubmit = () => {
    if (text.trim() === '') return
    onSubmit(text.trim())
    setText('')
    setShowMentions(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) handleSubmit()
    if (e.key === 'Escape') setShowMentions(false)
  }

  const renderText = (text) => {
    const parts = text.split(/(@\w+)/g)
    return parts.map((part, i) =>
      part.startsWith('@')
        ? <span key={i} className={styles.mentionHighlight}>{part}</span>
        : part
    )
  }

  return (
    <div className={styles.inputWrap}>
      <div className={styles.inputBox}>
        <div className={styles.textareaWrap}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder={placeholder}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {showMentions && filteredUsers.length > 0 && (
            <div className={styles.mentionDropdown}>
              {filteredUsers.map(user => (
                <div
                  key={user}
                  className={styles.mentionItem}
                  onMouseDown={() => insertMention(user)}
                >
                  <div
                    className={styles.mentionAvatar}
                    style={{ background: getAvatarColor(user) }}
                  >
                    {getInitial(user)}
                  </div>
                  @{user}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.inputFooter}>
          <span className={styles.hint}>Ctrl+Enter to post · @ to mention</span>
          <button
            className={styles.btnPost}
            onClick={handleSubmit}
            disabled={text.trim() === ''}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

const Comment = ({ comment, currentUser, isOwner, onDelete, onReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false)

  const canDelete = currentUser === comment.author || isOwner

  const handleReplySubmit = (text) => {
    onReply(comment.id, text)
    setShowReplyInput(false)
  }

  const renderText = (text) => {
    const parts = text.split(/(@\w+)/g)
    return parts.map((part, i) =>
      part.startsWith('@')
        ? <span key={i} className={styles.mentionHighlight}>{part}</span>
        : part
    )
  }

  return (
    <div className={styles.commentWrap}>
      <div className={styles.comment}>
        <div className={styles.commentHead}>
          <div
            className={styles.commentAvatar}
            style={{ background: getAvatarColor(comment.author) }}
          >
            {getInitial(comment.author)}
          </div>
          <span className={styles.commentName}>@{comment.author}</span>
          <span className={styles.commentTime}>{comment.createdAt}</span>
          <div className={styles.commentActions}>
            <button
              className={styles.actionBtn}
              onClick={() => setShowReplyInput(prev => !prev)}
            >
              Reply
            </button>
            {canDelete && (
              <button
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={() => onDelete(comment.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <p className={styles.commentText}>{renderText(comment.text)}</p>
      </div>

      {/* REPLIES */}
      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map(reply => (
            <div key={reply.id} className={styles.reply}>
              <div className={styles.commentHead}>
                <div
                  className={styles.commentAvatar}
                  style={{ background: getAvatarColor(reply.author), width: '18px', height: '18px', fontSize: '8px' }}
                >
                  {getInitial(reply.author)}
                </div>
                <span className={styles.commentName}>@{reply.author}</span>
                <span className={styles.commentTime}>{reply.createdAt}</span>
                {(currentUser === reply.author || isOwner) && (
                  <div className={styles.commentActions}>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => onDelete(comment.id, reply.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <p className={styles.commentText}>{renderText(reply.text)}</p>
            </div>
          ))}
        </div>
      )}

      {showReplyInput && (
        <div className={styles.replyInputWrap}>
          <CommentInput
            onSubmit={handleReplySubmit}
            placeholder={`Replying to @${comment.author}...`}
            buttonLabel="Reply"
          />
        </div>
      )}
    </div>
  )
}

const CommentSection = ({ comments: initialComments, currentUser, isOwner }) => {
  const [comments, setComments] = useState(initialComments)

  const handleAddComment = (text) => {
    const newComment = {
      id: `c${Date.now()}`,
      author: currentUser,
      text,
      createdAt: 'just now',
      replies: [],
    }
    setComments(prev => [newComment, ...prev])
  }

  const handleDelete = (commentId, replyId = null) => {
    if (replyId) {
      setComments(prev => prev.map(c =>
        c.id === commentId
          ? { ...c, replies: c.replies.filter(r => r.id !== replyId) }
          : c
      ))
    } else {
      setComments(prev => prev.filter(c => c.id !== commentId))
    }
  }

  const handleReply = (commentId, text) => {
    const newReply = {
      id: `r${Date.now()}`,
      author: currentUser,
      text,
      createdAt: 'just now',
    }
    setComments(prev => prev.map(c =>
      c.id === commentId
        ? { ...c, replies: [...(c.replies || []), newReply] }
        : c
    ))
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>Comments</div>

      <CommentInput onSubmit={handleAddComment} />

      <div className={styles.list}>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            isOwner={isOwner}
            onDelete={handleDelete}
            onReply={handleReply}
          />
        ))}
        {comments.length === 0 && (
          <div className={styles.empty}>No comments yet. Be the first!</div>
        )}
      </div>
    </div>
  )
}

export default CommentSection