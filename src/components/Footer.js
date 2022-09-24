function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 z-20 p-4 w-full  border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <span class="text-sm text-white sm:text-center dark:text-gray-400">© 2022  All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-white dark:text-gray-400 sm:mt-0">
            <li>
                <div className="mr-4 hover:underline md:mr-6 ">About</div>
            </li>
            <li>
                <div className="mr-4 hover:underline md:mr-6">Privacy Policy</div>
            </li>
            <li>
                <div className="mr-4 hover:underline md:mr-6">Licensing</div>
            </li>
            <li>
                <div className="hover:underline">Contact</div>
            </li>
        </ul>
    </footer>
    );
  }
  
  export default Footer;