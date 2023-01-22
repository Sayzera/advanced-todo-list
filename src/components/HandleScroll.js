import React from "react"

export default function HandleScroll({ setOffset }) {
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll_)

    return () => {
      window.removeEventListener("scroll", handleScroll_)
    }
  }, [])

  const handleScroll_ = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setOffset((prev) => prev + 5)
    }
  }
  return <div></div>
}
