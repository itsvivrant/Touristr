# Welcome To Touristr
Touristr is a full-stack photo sharing application, inspired by Flickr. Users can upload photos of places they've been to as well as view photos, comment, and create their own photo albums.

### Live Link: [*Find your inner tourist*](https://touristr-lens.herokuapp.com/)
<img width="1440" alt="touristr-front-page" src="https://user-images.githubusercontent.com/73407516/129510268-b362ddf7-15a0-4397-9a6b-81b98a617b7f.png">
<p>

# Walkthrough
### View photos
![image](https://user-images.githubusercontent.com/73407516/129508013-ba7a44aa-cd12-4df8-b4de-c59f5fc5cb9e.png)

### View specific photo 
![image](https://user-images.githubusercontent.com/73407516/129508728-ce7623c3-3875-4dbb-8ec8-37828beb731c.png)

### Edit photo 
<img width="1440" alt="touristr-edit-photo" src="https://user-images.githubusercontent.com/73407516/129509875-177d6595-faa4-4632-b55b-258d67931965.png">

### Upload photo
<img width="1440" alt="touristr-upload-photo" src="https://user-images.githubusercontent.com/73407516/129508806-c550e971-d985-413d-b306-24c95b9fe2c9.png">

### User profile page
<img width="1440" alt="touristr-profile-page" src="https://user-images.githubusercontent.com/73407516/129510014-9eafae5c-970f-4698-a9af-dfe7e5e10edf.png">
  
# Technologies
### Front End
* Javascript
* HTML
* CSS
* React
* Redux
* AJAX
* Hosted on Heroku

### Back End
* PostgresSQL
* Express.js
* Sequelize.js
* CSURF Library
* Express Validator Library
* AWS


# Features
* User authentication is completed by hashing passwords using bcrypt js library
* Implementation of CSURF protection to prevent csrf attacks
* Users can view, upload, and edit photos
* Users can add, delete comments, and update comments
* Users can view their photos, albums, and favorites in their profile page
* Photos can be uploaded locally using AWS

# Stretch Goals
* Ultilize Google API so users can map the geolocation of their photos
* Implement favorites
* Add Tags
