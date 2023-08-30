import { useEffect, useState } from "react"
import { onFirebaseAuthStateChanged } from "../config/client"
import { useRouter } from "next/router"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  useEffect(() => {
    onFirebaseAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    const actualPage = router.pathname
    user === USER_STATES.NOT_LOGGED && actualPage !== "/signUp" && router.push("/")
  }, [user])

  return user
}
