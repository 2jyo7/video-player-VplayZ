import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className=''>
        <footer className="flex flex-col space-y-10 justify-center m-10">
  <nav className="flex justify-center flex-wrap gap-6 text-gray-600 font-medium mt-2">
    <Link className="hover:text-gray-900" href="#">
      Home
    </Link>
    <Link className="hover:text-gray-900" href="#">
      About
    </Link>
    <Link className="hover:text-gray-900" href="#">
      Services
    </Link>
    <Link className="hover:text-gray-900" href="#">
      Media
    </Link>
    <Link className="hover:text-gray-900" href="#">
      Gallery
    </Link>
    <Link className="hover:text-gray-900" href="#">
      Contact
    </Link>
  </nav>
  <div className="flex justify-center space-x-5">
    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <Image src="https://img.icons8.com/fluent/30/000000/facebook-new.png"  alt='icons-img-social' width={60} height={50}/>
    </Link>
    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
      <Image src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"  alt='icons-img-social' width={60} height={50}/>
    </Link>
    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <Image src="https://img.icons8.com/fluent/30/000000/instagram-new.png"  alt='icons-img-social' width={60} height={50}/>
    </Link>
    <Link href="https://messenger.com" target="_blank" rel="noopener noreferrer">
      <Image src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" alt='icons-img-social' width={60} height={50} />
    </Link>
    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <Image src="https://img.icons8.com/fluent/30/000000/twitter.png"  alt='icons-img-social' width={60} height={50}/>
    </Link>
  </div>
  <p className="text-center text-gray-700 font-medium mb-2">
    © 2024 Company Ltd. All rights reservered.
  </p>
</footer>

    </div>
  )
}

export default Footer