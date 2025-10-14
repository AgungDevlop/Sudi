import { FaDownload } from 'react-icons/fa';

export function Download() {
  const videoUrl = sessionStorage.getItem('videoUrl'); // Get video URL from session storage
  const videoTitle = sessionStorage.getItem('videoTitle'); // Get video title from session storage

  // Array of URLs for pop-under links
  const randomUrls = [
    'https://enviousgarbage.com/HE9TFh',
    'https://mo.gatsbykynurin.com/iDo8P9Ad0aP/94691',
    'https://aviatorreproducesauciness.com/2082665',
    'https://viidedss.com/dc/?blockID=388556',
    'https://enviousgarbage.com/bX3.V/0xPu3-pdv/bVmoVNJYZQDH0q2-NMjHcy2VNETAM-5bLlT/Yr2lNJz/Yn1/NiD/Ac'
  ];
  
  const handleDownload = () => {
    if (videoUrl) {
      // Open the video URL in a new tab
      window.open(videoUrl, '_blank');

      // Redirect the current tab to a random URL after 2 seconds
      setTimeout(() => {
        const randomUrl = randomUrls[Math.floor(Math.random() * randomUrls.length)];
        window.location.href = randomUrl;
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-400">Download Video {videoTitle ? `- ${videoTitle}` : ''}</h1>
        {videoUrl ? (
          <button
            onClick={handleDownload}
            className="bg-red-700 text-white p-4 rounded flex items-center justify-center mx-auto hover:bg-red-800 transition-colors shadow-lg"
          >
            <FaDownload className="mr-2" />
            Download Video
          </button>
        ) : (
          <p className="text-red-500">Tidak ada URL video yang tersedia untuk diunduh.</p>
        )}
      </div>
    </div>
  );
}
