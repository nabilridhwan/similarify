import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function SectionButton({ to = -1, children }) {
    const navigate = useNavigate();
    return (
        <motion.button
            onClick={() => navigate(to)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="dark:text-white dark:border-white text-black font-bold py-2 px-4 rounded-full border-2 border-black">

            <div className="flex justify-center items-center">
                {children}
            </div>

        </motion.button>
    )
}