interface OverlayProps {
  isVisible: boolean;
  onClick: () => void;
}

export default function Overlay({ isVisible, onClick }: OverlayProps) {
  if (!isVisible) return null;
  
  return (
    <div 
      className="lg:hidden fixed inset-0 bg-black/50 z-40"
      onClick={onClick}
    />
  );
}
