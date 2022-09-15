import React, { FC } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../utils/hooks/useAuth"
import { CircleLoading } from "./circle-loading"

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation()
  const { loading, user } = useAuth()
  if (loading) {
    return <CircleLoading />
  }
  if (user) return <>{children}</>
  return <Navigate to="/login" state={{ from: location }} replace />
}
