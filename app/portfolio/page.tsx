"use client"
import { motion } from "framer-motion"

const PortfolioPage = () => {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "A brief description of Project 1.",
      imageUrl: "/project1.jpg", // Replace with your image path
      link: "#",
    },
    {
      id: 2,
      title: "Project 2",
      description: "A brief description of Project 2.",
      imageUrl: "/project2.jpg", // Replace with your image path
      link: "#",
    },
    {
      id: 3,
      title: "Project 3",
      description: "A brief description of Project 3.",
      imageUrl: "/project3.jpg", // Replace with your image path
      link: "#",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div variants={item} key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={project.imageUrl || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700">{project.description}</p>
              <a
                href={project.link}
                className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                View Project
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default PortfolioPage
