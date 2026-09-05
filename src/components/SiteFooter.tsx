import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-bold text-primary">OSIGN</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign the Future — real-time emergency sign language recognition that turns urgent
            gestures into words anyone can understand.
          </p>
        </div>
        <div className="flex gap-12">
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Product</p>
            <Link to="/live" className="block text-muted-foreground hover:text-primary">
              Live Demo
            </Link>
            <Link to="/learn" className="block text-muted-foreground hover:text-primary">
              Learn Signs
            </Link>
            <Link to="/about" className="block text-muted-foreground hover:text-primary">
              About
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Project</p>
            <span className="block text-muted-foreground">Research Build</span>
            <span className="block text-muted-foreground">Accessibility First</span>
            <span className="block text-muted-foreground">Open Dataset</span>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} OSIGN. Built for emergency accessibility.
      </p>
    </footer>
  );
}
