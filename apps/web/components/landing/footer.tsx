import { Pencil } from "lucide-react"

const icons = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        color="currentColor"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17" />
        <path d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22" />
      </svg>
    ),
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        color="currentColor"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.9364 2H19.6547C20.4117 2 20.7903 2 20.9433 2.23713C21.0963 2.47427 20.927 2.79859 20.5884 3.44721L15.0896 13.9817C14.8301 14.479 14.7003 14.7276 14.7151 14.9919C14.73 15.2562 14.8869 15.49 15.2008 15.9577L18.2219 20.4592C18.6782 21.1392 18.9064 21.4792 18.758 21.7396C18.6096 22 18.1876 22 17.3437 22H15.2478C14.6566 22 14.361 22 14.1179 21.8649C13.8749 21.7298 13.7283 21.484 13.4349 20.9923L10.4147 15.9293C10.1433 15.4744 10.0076 15.2469 10.0003 14.9963C9.99304 14.7456 10.1154 14.5113 10.36 14.0426L16.0689 3.10557C16.3497 2.56766 16.4901 2.2987 16.7424 2.14935C16.9946 2 17.3086 2 17.9364 2Z" />
        <path d="M4.27747 6H5.41341C6.00959 6 6.30768 6 6.54724 6.14935C6.78679 6.2987 6.9201 6.56766 7.18672 7.10557L8.67368 10.1056C8.89123 10.5445 9 10.7639 9 11C9 11.2361 8.89123 11.4555 8.67368 11.8944L7.18672 14.8944C6.9201 15.4323 6.78679 15.7013 6.54724 15.8507C6.30768 16 6.00959 16 5.41341 16H4.27747C3.55858 16 3.19914 16 3.05386 15.7629C2.90857 15.5257 3.06932 15.2014 3.39082 14.5528L4.70845 11.8944C4.92599 11.4555 5.03476 11.2361 5.03476 11C5.03476 10.7639 4.92599 10.5445 4.70844 10.1056L3.39082 7.44721C3.06932 6.79858 2.90857 6.47427 3.05386 6.23713C3.19914 6 3.55858 6 4.27747 6Z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400">
            <Pencil className="h-3 w-3 text-white" />
          </span>
          Scribbl
        </div>
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <a href="#features" className="transition hover:text-foreground">
            Features
          </a>
          <a href="#preview" className="transition hover:text-foreground">
            Preview
          </a>
          <a href="#why" className="transition hover:text-foreground">
            Why
          </a>
          <a href="#" className="transition hover:text-foreground">
            Privacy
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#"
            aria-label="GitHub"
            className="glass grid h-9 w-9 place-items-center rounded-xl text-muted-foreground transition hover:text-foreground"
          >
            {icons[0]?.icon}
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="glass grid h-9 w-9 place-items-center rounded-xl text-muted-foreground transition hover:text-foreground"
          >
            {icons[2]?.icon}
          </a>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Scribbl. Crafted for thinkers.
      </p>
    </footer>
  )
}
