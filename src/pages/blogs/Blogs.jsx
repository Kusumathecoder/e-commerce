import React from 'react';
import blogsData from "../../data/blogs.json";

const Blogs = () => {
    //console.log(blogsData);

    return (
        <section style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
            <h2 className='section__header'>
                Latest From Blogs
            </h2>
            <p className='section__subheader mb-12' >
                Elevate your wardrobe with our freshest style tips, trends, and inspiration on our blog.
            </p>

            {/* ✅ Use Flexbox for Row Layout */}
            <div 
                style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "20px", 
                    justifyContent: "center" 
                }}
            >
                {blogsData.map((blog, index) => (
                    <div 
                        key={index} 
                        style={{
                            width: "250px",
                            background: "#fff",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                            textAlign: "center",
                            padding: "10px",
                            transition: "transform 0.3s",
                            cursor: "pointer"
                        }}
                        className="blog-card"
                    >
                        {/* ✅ Image with Fixed Width */}
                        <img 
                            src={blog.imageUrl} 
                            alt="blog image" 
                            style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                transition: "transform 0.3s",
                            }}
                        />
                        <div style={{ padding: "10px" }}>
                            <h6 style={{ color: "#666", fontSize: "14px" }}>{blog.subtitle}</h6>
                            <h4 style={{ fontSize: "18px", fontWeight: "bold", margin: "5px 0" }}>{blog.title}</h4>
                            <p style={{ fontSize: "14px", color: "#999" }}>{blog.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ CSS for Hover Effect */}
            <style>
                {`
                    .blog-card:hover {
                        transform: scale(1.05);
                    }
                `}
            </style>
        </section>
    );
};

export default Blogs;
