"use client"

const ServicesPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Web Development</h2>
          <p className="text-gray-700">
            We offer comprehensive web development services, from front-end design to back-end infrastructure. We use
            the latest technologies to create responsive, scalable, and user-friendly websites.
          </p>
        </div>

        {/* Service Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Mobile App Development</h2>
          <p className="text-gray-700">
            Our mobile app development team creates native iOS and Android applications tailored to your specific needs.
            We focus on delivering high-performance, intuitive, and engaging mobile experiences.
          </p>
        </div>

        {/* Service Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">UI/UX Design</h2>
          <p className="text-gray-700">
            We specialize in creating visually appealing and user-centered designs. Our UI/UX experts conduct thorough
            research and testing to ensure your product is both beautiful and functional.
          </p>
        </div>

        {/* Service Card 4 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Digital Marketing</h2>
          <p className="text-gray-700">
            Boost your online presence with our digital marketing services. We offer SEO, social media marketing, and
            PPC advertising to help you reach your target audience and drive conversions.
          </p>
        </div>

        {/* Service Card 5 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Cloud Solutions</h2>
          <p className="text-gray-700">
            Leverage the power of the cloud with our cloud solutions. We provide cloud migration, infrastructure
            management, and application development services to help you optimize your IT environment.
          </p>
        </div>

        {/* Service Card 6 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Consulting</h2>
          <p className="text-gray-700">
            Our experienced consultants provide strategic guidance and technical expertise to help you achieve your
            business goals. We offer consulting services in areas such as technology strategy, project management, and
            process improvement.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
