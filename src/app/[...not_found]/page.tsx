import InnerPage from '@/components/Pages/InnerPages'


import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function NotFoundCatchAll(){
 notFound()
 
 return null
}
