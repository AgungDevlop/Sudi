import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCopy, FaSearch, FaDownload } from 'react-icons/fa';

// Tambahkan deklarasi global untuk properti fluidPlayer pada objek window
declare global {
  interface Window {
    fluidPlayer?: (elementId: string, options?: any) => void;
  }
}

export function PlayVideo() {
  const { id } = useParams<{ id: string }>();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [videos, setVideos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const videosPerPage = 10;

  // Array URL video dasar
  const videoBaseUrls = ['https://videq.doobs.top/e/'];

  // Array URL untuk pop-under
  const randomUrls = [
    'https://otieu.com/4/9814549',
    'https://malakingannets.com/ic4wSTmH5JgaK77X/94691',
    'https://meowadvertising.com/hc70ax5ct2?key=7df760c08ecfe3653c332fbdce13d42a',
    'https://superficial-work.com/ba3RV.0YPk3Xp/v/b/mOVsJHZqDV0Y0KO/DVQWzkOvD/MK3pLvT/QJ4JNmDyM/4MMozHgS'
  ];

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/AgungDevlop/Viral/refs/heads/main/Video.json'
        );
        const data = await response.json();

        // Shuffle data video
        const shuffledData = shuffleArray(data);

        // Cari video berdasarkan id
        const video = shuffledData.find((item: { id: string }) => item.id === id);
        if (video) {
          document.title = video.Judul;
          setVideoUrl(video.Url);
          setVideoTitle(video.Judul);
          sessionStorage.setItem('videoUrl', video.Url);
          sessionStorage.setItem('videoTitle', video.Judul);
        }
        setVideos(shuffledData);
        setFilteredVideos(shuffledData);
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${window.location.hostname}/${id}`);
    alert('Link video telah disalin ke clipboard!');
  };

  const getRandomUrlWithId = (videoId: string) => {
    const baseUrl = videoBaseUrls[Math.floor(Math.random() * videoBaseUrls.length)];
    return `${baseUrl}${videoId}`;
  };

  const getRandomPopUnderUrl = () => {
    return randomUrls[Math.floor(Math.random() * randomUrls.length)];
  };

  const handleCardClick = (videoId: string) => {
    const randomVideoUrl = getRandomUrlWithId(videoId);
    window.open(randomVideoUrl, '_blank'); // Buka video di tab baru

    // Redirect ke pop-under setelah 2 detik
    setTimeout(() => {
      window.location.href = getRandomPopUnderUrl();
    }, 2000);
  };

  const handleDownloadClick = () => {
    sessionStorage.setItem('videoUrl', videoUrl);
    window.open('/download', '_blank'); // Buka halaman download di tab baru

    // Redirect ke pop-under setelah 2 detik
    setTimeout(() => {
      window.location.href = getRandomPopUnderUrl();
    }, 2000);
  };

  useEffect(() => {
    const filtered = videos.filter(video =>
      video.Judul.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
    setCurrentPage(1);
  }, [searchTerm, videos]);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Inisialisasi Fluid Player ketika videoUrl sudah tersedia
  useEffect(() => {
    if (!loading && videoUrl) {
      if (window.fluidPlayer) {
        window.fluidPlayer('video-id', {
          layoutControls: {
            controlBar: {
              autoHideTimeout: 3,
              animated: true,
              autoHide: true
            },
            htmlOnPauseBlock: {
              html: null,
              height: null,
              width: null
            },
            autoPlay: false,
            mute: true,
            allowTheatre: true,
            playPauseAnimation: true,
            playbackRateEnabled: true,
            allowDownload: false,
            playButtonShowing: true,
            fillToContainer: false,
            posterImage: ''
          },
          vastOptions: {
            adList: [
              {
                roll: 'preRoll',
                vastTag:
                  'https://knowledgeable-tree.com/dEmAFqzid.GBN/vtZUGDUS/heIma9iuJZFUtljk/PPT/Y/wBNtjPcbyHMPzcEItUNOjgA/2NNTzUIGzlM_itZTssaBWV1zp/daDX0Hxm',
                adText: ''
              },
              {
                roll: 'midRoll',
                vastTag:
                  'https://knowledgeable-tree.com/dEmAFqzid.GBN/vtZUGDUS/heIma9iuJZFUtljk/PPT/Y/wBNtjPcbyHMPzcEItUNOjgA/2NNTzUIGzlM_itZTssaBWV1zp/daDX0Hxm',
                adText: ''
              },
              {
                roll: 'postRoll',
                vastTag:
                  'https://knowledgeable-tree.com/dEmAFqzid.GBN/vtZUGDUS/heIma9iuJZFUtljk/PPT/Y/wBNtjPcbyHMPzcEItUNOjgA/2NNTzUIGzlM_itZTssaBWV1zp/daDX0Hxm',
                adText: ''
              },
              {
                roll: 'onPauseRoll',
                vastTag:
                  'https://knowledgeable-tree.com/dEmAFqzid.GBN/vtZUGDUS/heIma9iuJZFUtljk/PPT/Y/wBNtjPcbyHMPzcEItUNOjgA/2NNTzUIGzlM_itZTssaBWV1zp/daDX0Hxm',
                adText: ''
              }
            ],
            adCTAText: false,
            adCTATextPosition: ''
          }
        });
      } else {
        console.error('Fluid Player library belum termuat.');
      }
    }
  }, [loading, videoUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Judul Video */}
      <h1 className="text-2xl font-bold mb-4 text-center break-words text-orange-400">{videoTitle}</h1>

      {/* Video Player dengan Fluid Player */}
      <div className="mb-4 w-full h-auto rounded-lg overflow-hidden shadow-lg border border-gray-700 flex items-center justify-center bg-black">
        <video id="video-id" className="w-full h-full object-contain" preload="metadata">
          <source src={videoUrl} type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>
      </div>

      {/* Copy URL Video */}
      <div className="flex mb-4 border border-gray-700 rounded-lg overflow-hidden">
        <input
          type="text"
          value={`https://${window.location.hostname}/${id}`}
          readOnly
          className="flex-1 p-3 bg-gray-800 text-white outline-none"
        />
        <button onClick={handleCopy} className="bg-orange-500 hover:bg-orange-600 transition-colors text-white p-3">
          <FaCopy />
        </button>
      </div>

      {/* Tombol Download */}
      <button
        onClick={handleDownloadClick}
        className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white py-3 rounded-lg flex items-center justify-center font-semibold mb-4 shadow-md"
      >
        <FaDownload className="mr-2" />
        Download
      </button>

      {/* Search Bar */}
      <div className="flex mb-4 border border-gray-700 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Cari video..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 bg-gray-800 text-white outline-none"
        />
        <button onClick={() => handlePageChange(1)} className="bg-orange-500 hover:bg-orange-600 transition-colors text-white p-3">
          <FaSearch />
        </button>
      </div>

      {/* Daftar Video dalam Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleCardClick(video.id)}
            className="border border-gray-700 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors shadow-md cursor-pointer flex flex-col justify-between"
          >
            {/* Thumbnail Video */}
            <div className="w-full h-32 rounded-lg overflow-hidden mb-2">
              <video
                className="w-full h-full object-cover"
                preload="metadata"
                muted
              >
                <source src={video.Url} type="video/mp4" />
                <img
                  src="https://via.placeholder.com/150"
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover"
                />
              </video>
            </div>
            {/* Judul Video dengan Ellipsis */}
            <h2 className="text-white font-medium text-sm truncate">{video.Judul}</h2>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-700 hover:bg-gray-600 transition-colors text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Sebelumnya
        </button>

        <div className="flex items-center">
          {currentPage > 2 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="mx-1 p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-white"
              >
                1
              </button>
              {currentPage > 3 && <span className="mx-1 text-gray-400">...</span>}
            </>
          )}

          {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
            const pageNumber = index + Math.max(1, currentPage - 2);
            if (pageNumber <= totalPages) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`mx-1 p-2 rounded ${
                    currentPage === pageNumber ? 'bg-orange-500' : 'bg-gray-700'
                  } hover:bg-orange-600 transition-colors text-white`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className="mx-1 text-gray-400">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="mx-1 p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-white"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-700 hover:bg-gray-600 transition-colors text-white py-2 px-4 rounded disabled:opacity-50"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}