import React, { useState } from 'react';


const UserProfileForm = () => {
    const [ FormData, setFormData] = useState({
        Name: ' ', 
        Bio:  ' ',
        Location: ' ',
        StatusMessage: ' '


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...FormData,
        [name]: value
    });

};


const Task = () => {
    return (
    <div>
        <h1> Add your full name so friends can find you.:</h1>


        <h1>Full Name:</h1>
        <label>
            Name:
            <Input
                type-"text"
                name="name"
                value={formData.name}
                onchange={handleNameChange}
                Placeholder="John Doe"
        />
        </label>

);


    <h1>Tell us about yourself in 160 characters or less.</h1>

        <h1> Bio:</h1>
            <label>
                Bio:
                <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                Placeholder=" SOftware Engineer at Project Ascend "
                />
                </label>




    <h1>Where are you based?</h1>
    <label>
         location:
            <Input
                type="text"
                name="location"
                value={FormData.location}
                onChange={handleInputChange}
                Placeholder="San Francisco, CA"
                />
                </label>




<h1>Set your Status Message</h1>
    <label>
         Status Message:
        <textarea
                type="text"
                value={Status Message}
                Placeholder="Excited to code!"
         />
    </label>



</div>
                
)
)

export default Task;


                
        

