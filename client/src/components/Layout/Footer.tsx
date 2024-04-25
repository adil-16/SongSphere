

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white">
  <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0 flex justify-center md:justify-start">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white mr-6">
          <span className="sr-only">Facebook</span>
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M18.768 2H5.232A3.232 3.232 0 002 5.232v13.536A3.232 3.232 0 005.232 22h6.536v-6.536H9.768V12h1.992V9.992c0-1.984 1.216-3.088 2.992-3.088.864 0 1.608.064 1.824.096v2.112h-1.248c-1.024 0-1.224.488-1.224 1.2V12h2.448l-.32 2.464h-2.128V22h4.128A3.232 3.232 0 0022 18.768V5.232A3.232 3.232 0 0018.768 2z"/>
          </svg>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white mr-6">
          <span className="sr-only">Twitter</span>
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
            <path d="M22.46 6c-.774 1.992-2.374 3.46-4.184 4.02.024.46.024.92.024 1.38 0 14.02-10.66 22-22 22-4.464 0-8.464-1.312-11.96-3.56 2.232.26 4.464-.34 6.232-1.56-2.088-.04-3.832-1.42-4.44-3.32.292.06.584.1.876.1.428 0 .856-.06 1.284-.16-2.18-.44-3.812-2.38-3.812-4.7v-.06c.644.36 1.376.6 2.108.62-1.276-.86-2.108-2.34-2.108-4-.44 1.94 1.032 3.78 2.584 4.18-.98-.3-1.852-1.1-2.232-2.06.36.72.98 1.22 1.676 1.52-.876-.3-1.852-.98-2.484-1.7 1.232 1.52 2.712 2.64 4.544 2.76-.144-.6-.216-1.22-.216-1.86 0-4.44 3.6-8.04 8.04-8.04 2.312 0 4.392.98 5.856 2.56 1.824-.36 3.536-1.02 5.072-1.94-.6 1.88-1.872 3.44-3.528 4.44 1.596-.2 3.192-.62 4.64-1.24z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white">
          <span className="sr-only">Instagram</span>
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37a4 4 0 11-8 0 4 4 0 018 0z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
      <div className="text-center md:text-right text-white text-lg">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer