export default function Modal({ children, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-card border border-border bg-surface p-6 shadow-card"
      >
        {children}
      </div>
    </div>
  )
}
