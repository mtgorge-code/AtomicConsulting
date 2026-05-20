interface SRProps {
  children: React.ReactNode;
}

export function SR({ children }: SRProps) {
  return <span className="sr-only">{children}</span>;
}
