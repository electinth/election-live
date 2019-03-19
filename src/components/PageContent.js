import React, {
  useState,
  createContext,
  useContext,
  useLayoutEffect,
} from "react"
const context = createContext(null)

export default function PageContent({ children }) {
  const { setContent } = useContext(context)
  useLayoutEffect(() => {
    setContent(children)
  }, [children])
  return null
}

export function PageContentContextProvider({ children }) {
  const [content, setContent] = useState(null)
  return (
    <context.Provider value={{ content, setContent }}>
      {children}
    </context.Provider>
  )
}

export function PageContentOutlet() {
  const { content } = useContext(context)
  return content
}
