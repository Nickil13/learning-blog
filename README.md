# Learning Blog
A personal blog with a Node.js backend and a React frontend. Users can perform basic CRUD operations with posts, with authentication and authorization required.

- Posts can be filtered by category
- Posts can be managed by the logged in user using an Admin dashboard.
  - Upload images to Cloudinary
  - Save posts as drafts
- Darkmode feature

## Live site
- Heroku: [learningblogapp](https://learningblogapp.herokuapp.com/)

## Technologies Used
- HTML
- Tailwind CSS
- React
- MongoDB, Mongoose
- Node.js, Express

## My process
I started out working on the frontend, developing the Home page and the Navbar. Then I worked on making the other pages, routing and styling. I had a user saved to local storage to work with frontend authentication. I also had some local data I used to visualize the posts.

For the backend, I started with the server and moved into mongoose models for the user and posts. Then I integrated backend routing and HTTP methods, leaving encryption and authentication until afterwards.

The last few touches involved looking over my code, the UX of the website and refining the responsivity of some elements.

## What I learned
I learned how to integrate the frontend and backend of a project, and to deploy it on Heroku.

Stylistically, I got more practice with Tailwind by adding extensions and working with a vertical navbar. 

I also learned how to upload files and save them locally, eventually moving over to Cloudinary for my image storage.

## What I like about this project
Of all my current projects I feel like this one showcases my creativity and my curiosity. 

- The Navbar
I really wanted a navbar that was on the side of the screen like a dashboard. Since this was my first time doing that, I ran into problems with responsivity. The bar was too thick on smaller screens and made it difficult to pay attention to the post feed. On screens with a smaller height, the icons had to react and the user and new post component on the bottom would get cut off (especially on mobile devices). All of these things contributed to making the blog an amazing learning experience.

- Custom image selector
Instead of using the available Cloudindary widget to grab uploaded images, I created my own custom component.  


## Preview
<img src='https://user-images.githubusercontent.com/36387179/152872005-7139926f-9bb2-4cb2-a2c4-8d01b06c9438.PNG' width="700">
