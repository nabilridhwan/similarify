import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import DefaultAlbumImage from "./DefaultImage";
export default function Playlist({ playlist }) {
    let navigate = useNavigate();
    return (
        <div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    type: "tween",
                    ease: "easeOut"
                }}
                className="flex items-center">


                {playlist.albumArt ? (

                    <img
                        src={playlist.albumArt} className="w-20 h-auto" alt="album_image" />
                ) : (
                    <DefaultAlbumImage size={20} />
                )}

                <div className="ml-5">
                    <a
                        href={`https://open.spotify.com/playlist/${playlist.id}`}
                        className="font-bold underline hover:no-underline">
                        {playlist.name}
                    </a>
                    <p className="dark:text-white/50 text-black/50 text-sm">
                        {playlist.tracks} Songs by {playlist.owner}
                    </p>


                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(`/playlist/${playlist.id}`, { state: { name: playlist.name, total: playlist.tracks } })}
                        className="btn bg-blue-500 text-white my-2 text-sm flex items-center">
                        Select songs
                        <FaArrowRight className="ml-2" />
                    </motion.button>

                </div>

            </motion.div>
        </div>
    )
}