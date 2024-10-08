import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import "./CVPageMain.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import jsPDF from "jspdf";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import MenuButton from "../../components/MenuButton/MenuButton";
import AddButton from "../../components/AddButton/AddButton";
//------------------------------------------------------------------------- Components and Design

const Container = styled.div`
  position: fixed;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 81%;
  background-color: #8cb9bd;
  padding: 1.1%;
  box-shadow: 0 4px 10px rgba(0.7, 0.1, 0, 0.6);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  justify-content: space-around;
  overflow-y: auto;
  overflow-x: hidden;
`;
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-9px);
  }
  60% {
    transform: translateY(-5px);
  }
`;
const BouncingImage = styled.img`
  animation: ${bounce} 1s 1;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid white;
  border-radius: 4px;
  background-color: #8cb9bd;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  color: white;
  font-size: 15px;
  transition: border-color 0.4s ease;
  width: 200px;
  &:hover {
    border-color: #8cb9bd;
  }
  &::placeholder {
    color: white;
  }
`;
const ImageUploadContainer = styled.div`
  width: 150px;
  height: 190px;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-color: white;
  border: 1.4px solid #333;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: block;
`;
const InputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;
const UploadText = styled.div`
  color: black;
  text-align: center;
  z-index: 1;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
`;

// const SubmitButton = styled.button`
//   background-color: #2e7eed;
//   color: white;
//   border: none;
//   padding: 12px;
//   width: 240px;
//   margin-top: 25%;
//   margin-left: 40%;
//   border-radius: 6px;
//   cursor: pointer; /* Disable pointer events during loading */
//   font-family: Verdana;
//   font-size: 30px;
//   position: relative;

//   &:hover {
//     background-color: ${(props) => (props.loading ? "#2e7eed" : "#4fa3ff")};
//   }
//   }
// `;

const slideIn = keyframes`
from {
  transform: translateX(170%);
}
to {
  transform: translateX(0);
}
`;
const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 17px;
  font-family: Verdana;
  margin-top: 4%;
  animation: ${slideIn} 0.5s ease;
  border-bottom: ${(props) =>
    props.active ? "2.4px solid white" : "2.4px solid #004e64"};
  color: ${(props) => (props.active ? "#004e64" : "#004e64")};
  transition: border-bottom 0.3s ease, color 0.3s ease;
  &:hover {
    border-bottom: 2.4px solid #8cb9bd;
  }
`;
// const UserIcoButton = styled.img`
//   width: 30px;
//   height: 35px;
//   margin-left: 84%;
//   margin-top: 0.5%;
// `;

// const DeleteButton = styled.button`
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   padding: 8px 16px;
//   background-color: #ff4d4d;
//   color: #fff;
//   border: none;
//   font-family: Verdana;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: bold;
//   transition: background-color 0.3s ease-in-out;

//   &:hover {
//     background-color: #d14848;
//   }
// `;

// const AddButton = styled.button`
//   margin-top: 1%;
//   margin-left: 90%;
//   padding: 12px 24px;
//   background-color: #4caf50;
//   color: #fff;
//   border: none;
//   font-family: Verdana;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   font-weight: bold;
//   transition: background-color 0.3s ease-in-out;
//   width: 130px;
//   &:hover {
//     background-color: #45a049;
//   }
// `;
// const DropdownMenu = styled.div`
//   display: ${(props) => (props.isOpen ? "block" : "none")};
//   position: absolute;
//   top: 100%;
//   left: 0;
//   background-color: #fff;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//   border-radius: 6px;
//   padding: 10px;
//   z-index: 1;
// `;
const GridItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  position: relative;
  margin: 1%;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(25px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const FadeInGridItem = styled(GridItem)`
  animation: ${fadeIn} 0.4s ease-in-out;
`;
const HeaderContainer = styled.div`
  display: flex;
  padding: 0.5px 15px;
  background-color: rgb(0, 78, 100);
  height: 47px;
`;
// const MenuItem = styled.div`
//   padding: 8px;
//   cursor: pointer;
//   &:hover {
//     background-color: #f1f1f1;
//   }
// `;
//----------------------------------------------------------------------------------------------------

const CVPageMain = () => {
  //-------------------------------------------------------------------------------------Button progressBar
  //----------------------------------------------------------------------------------------------------

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  //-----------------------------------------------------------------------------------------------------

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };
  //-----------------------------------------------------------------------------------------------------
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        // Assuming your existing handleInputChange function is available
        handleInputChange("personalData", "personPhoto", reader.result, true);
      };
      reader.readAsDataURL(file);

      fileInputRef.current.value = "";
    }
  };
  //------------------------------------------------------------------------------------------------------- Education info duplication
  const initialFieldTemplate = [
    { key: 1, className: "institutionName", placeholder: "İnstitut adı" },
    { key: 2, className: "facultyName", placeholder: "Fakültə adı" },
    { key: 3, className: "specialization", placeholder: "İxtisas" },
    { key: 4, className: "educationLevel", placeholder: "Təhsil səviyyəsi" },
    { key: 5, className: "educationForm", placeholder: "Təhsil forması" },
    { key: 6, className: "educationStatus", placeholder: "Təhsil vəziyyəti" },
    {
      key: 7,
      className: "startDate",
      placeholder: "Təhsilin başlama tarixi",
    },
    {
      key: 8,
      className: "endDate",
      placeholder: "Təhsilin bitmə tarixi",
    },
    { key: 9, className: "graduationWork", placeholder: "Diplom işi" },
    {
      key: 10,
      className: "graduationWorkTheme",
      placeholder: "Diplom işinin mövzusu",
    },
    {
      key: 11,
      className: "graduationWorkDescription",
      placeholder: "Diplom işinin təsviri",
    },
    {
      key: 12,
      className: "additionalInformation",
      placeholder: "Əlavə məlumat",
    },
  ];

  const [educationSets, setEducationSets] = useState([
    { name: "Təhsil", fields: initialFieldTemplate },
  ]);

  const generateUniqueId = () => {
    return new Date().getTime();
  };

  const addEducationSet = () => {
    const newSetId = generateUniqueId();
    const newSetName = `Təhsil`;
    const newSetFields = initialFieldTemplate.map((field) => ({
      key: field.key,
      className: `${field.className}`,
      placeholder: `${field.placeholder}`,
    }));

    setEducationSets([
      ...educationSets,
      { id: newSetId, name: newSetName, fields: newSetFields },
    ]);
  };

  const deleteEducationSet = (id) => {
    const updatedSets = educationSets.filter((set) => set.id !== id);
    setEducationSets(updatedSets);
  };
  //------------------------------------------------------------------------------------------------------ Language info duplication

  const initialLanguageFieldTemplate = [
    { key: 1, className: "languageName", placeholder: "Dil adı" },
    { key: 2, className: "languageLevel", placeholder: "Dil səviyyəti" },
  ];

  const [languageSets, setLanguageSets] = useState([
    { name: "Dil", fields: initialLanguageFieldTemplate },
  ]);

  const addLanguageSet = () => {
    const newSetId = generateUniqueId();
    const newSetName = `Dil`;
    const newSetFields = initialLanguageFieldTemplate.map((field) => ({
      key: field.key,
      className: `${field.className}`,
      placeholder: `${field.placeholder}`,
    }));

    setLanguageSets([
      ...languageSets,
      { id: newSetId, name: newSetName, fields: newSetFields },
    ]);
  };

  const deleteLanguageSet = (id) => {
    const updatedSets = languageSets.filter((set) => set.id !== id);
    setLanguageSets(updatedSets);
  };

  //------------------------------------------------------------------------------------------------------ Computer info duplication
  const initialComputerLanguageFieldTemplate = [
    {
      key: 1,
      className: "knowledgeName",
      placeholder: "Komputer bacarığı adı",
    },
    {
      key: 2,
      className: "knowledgeLevel",
      placeholder: "Komputer bacarığı səviyyəti",
    },
  ];
  const [ComputerlanguageSets, setComputerLanguageSets] = useState([
    {
      name: "Komputer",
      fields: initialComputerLanguageFieldTemplate,
    },
  ]);
  const addComputerLanguageSet = () => {
    const newSetId = generateUniqueId();
    const newSetName = `Komputer`;
    const newSetFields = initialComputerLanguageFieldTemplate.map((field) => ({
      key: field.key,
      className: `${field.className}`,
      placeholder: `${field.placeholder}`,
    }));

    setComputerLanguageSets([
      ...ComputerlanguageSets,
      { id: newSetId, name: newSetName, fields: newSetFields },
    ]);
  };

  const deleteComputerLanguageSet = (id) => {
    const updatedSets = ComputerlanguageSets.filter((set) => set.id !== id);
    setComputerLanguageSets(updatedSets);
  };
  //------------------------------------------------------------------------------------------------------- WorkExperience info duplication

  const initialWorkExperienceFieldTemplate = [
    { key: 1, className: "companyName", placeholder: "Şirkət adı" },
    { key: 2, className: "typeOfBusiness", placeholder: "Biznesin növü" },
    { key: 3, className: "jobTitle", placeholder: "Vəzifə adı" },
    { key: 4, className: "typeOfPosition", placeholder: "Vəzifənin növü" },
    { key: 5, className: "courseOfAction", placeholder: "Tədbirin növü" },
    {
      key: 6,
      className: "keyJobResponsibilities",
      placeholder: "Əsas vəzifə və cavabdehliklər",
    },
    { key: 7, className: "startDate", placeholder: "Başlama tarixi" },
    { key: 8, className: "endDate", placeholder: "Bitmə tarixi" },
    { key: 9, className: "reasonForSeparation", placeholder: "Ayrılma səbəbi" },
    {
      key: 10,
      className: "surnameAndPatronymicOfThePersonWhoCanRecommend",
      placeholder: "Tövsiyə verənın soyadı",
    },
    {
      key: 11,
      className: "positionOfThePersonWhoCanRecommend",
      placeholder: "Tövsiyə verənın vəzifəsi",
    },
    {
      key: 12,
      className: "contactPhoneNumberOfThePersonWhoCanRecommend",
      placeholder: "Tövsiyə verənın telefonu",
    },
    {
      key: 13,
      className: "emailOfThePersonWhoCanRecommend",
      placeholder: "Tövsiyə verənın emaili",
    },
    {
      key: 14,
      className: "additionalInformation",
      placeholder: "Əlavə məlumat",
    },
  ];

  const [workExperienceSets, setworkExperienceSets] = useState([
    { name: "Iş Təcrübəsi", fields: initialWorkExperienceFieldTemplate },
  ]);
  const addworkExperienceSet = () => {
    const newSetId = generateUniqueId();
    const newSetName = `Iş Təcrübəsi`;
    const newSetFields = initialWorkExperienceFieldTemplate.map((field) => ({
      key: field.key,
      className: `${field.className}`,
      placeholder: `${field.placeholder}`,
    }));

    setworkExperienceSets([
      ...workExperienceSets,
      { id: newSetId, name: newSetName, fields: newSetFields },
    ]);
  };

  const deleteworkExperienceSet = (id) => {
    const updatedSets = workExperienceSets.filter((set) => set.id !== id);
    setworkExperienceSets(updatedSets);
  };

  //-------------------------------------------------------------------------------------------------------- Adjust each set
  const flattenSets = (sets) => {
    return sets.map((set) => {
      return set.fields.reduce((result, field) => {
        result[field.className] = field.value || "";
        return result;
      }, {});
    });
  };

  const educationSetsWithFlattenedData = flattenSets(educationSets);
  //console.log(educationSetsWithFlattenedData);

  const transformedLanguageData = flattenSets(languageSets);
  //console.log(transformedLanguageData);

  const transformedComputerLanguageData = flattenSets(ComputerlanguageSets);
  //console.log(transformedComputerLanguageData);

  const transformedWorkExperienceData = flattenSets(workExperienceSets);
  //console.log(transformedWorkExperienceData);

  //---------------------------------------------------------------------------------------------------------- DB fetch
  const userID = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    userID: userID,
    personalData: {
      personPhoto: "",
      name: "",
      fatherName: "",
      surname: "",
      gender: "",
      familyStatus: "",
      citizenship: "",
      militaryService: "",
      email: "",
      driverLicense: "",
      city: "",
      address: "",
      landlinePhone: "",
      mobilePhone: "",
      linkedInLink: "",
      personalBio: "",
    },
    educations: educationSetsWithFlattenedData,
    languages: transformedLanguageData,
    computerKnowledges: transformedComputerLanguageData,
    workExperiences: transformedWorkExperienceData,
  });

  //---------------------------------------------------------------------------------------------------------- Input Changes
  const handleInputChange = (category, fieldName, value, isImage = false) => {
    setFormData((prevFormData) => {
      if (isImage) {
        return {
          ...prevFormData,
          [category]: {
            ...prevFormData[category],
            [fieldName]: value,
          },
        };
      }

      return {
        ...prevFormData,
        [category]: {
          ...prevFormData[category],
          [fieldName]: value,
        },
      };
    });
  };

  const handleEducationSetInputChange = (setId, fieldName, value) => {
    setEducationSets((prevSets) => {
      return prevSets.map((set) => {
        if (set.id === setId) {
          const updatedFields = set.fields.map((field) => {
            if (field.className === fieldName) {
              return { ...field, value };
            }
            return field;
          });

          return { ...set, fields: updatedFields };
        }
        return set;
      });
    });
  };

  // Function to handle changes in Language Sets
  const handleLanguageSetInputChange = (setId, fieldName, value) => {
    setLanguageSets((prevSets) => {
      return prevSets.map((set) => {
        if (set.id === setId) {
          const updatedFields = set.fields.map((field) => {
            if (field.className === fieldName) {
              return { ...field, value };
            }
            return field;
          });

          return { ...set, fields: updatedFields };
        }
        return set;
      });
    });
  };
  // Function to handle changes in Computer Language Sets
  const handleComputerLanguageSetInputChange = (setId, fieldName, value) => {
    setComputerLanguageSets((prevSets) => {
      return prevSets.map((set) => {
        if (set.id === setId) {
          const updatedFields = set.fields.map((field) => {
            if (field.className === fieldName) {
              return { ...field, value };
            }
            return field;
          });

          return { ...set, fields: updatedFields };
        }
        return set;
      });
    });
  };
  // Function to handle changes in Work Experience Sets
  const handleWorkExperienceSetInputChange = (setId, fieldName, value) => {
    setworkExperienceSets((prevSets) => {
      return prevSets.map((set) => {
        if (set.id === setId) {
          const updatedFields = set.fields.map((field) => {
            if (field.className === fieldName) {
              return { ...field, value };
            }
            return field;
          });

          return { ...set, fields: updatedFields };
        }
        return set;
      });
    });
  };

  //--------------------------------------------------------------------------------------------------------------- Button active modification

  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category, index) => {
    setActiveCategory(category);
    handleButtonClick(index);
  };
  //--------------------------------------------------------------------------------------------------------------- PDF

  // const generatePDF = () => {
  //   const pdf = new jsPDF();

  //   // Personal Data
  //   const imgData = formData.personalData.personPhoto;
  //   pdf.addImage(imgData, "PNG", 10, 0, 40, 40);
  //   pdf.text(`Name: ${formData.personalData.name}`, 10, 60);
  //   pdf.text(`Father's Name: ${formData.personalData.fatherName}`, 10, 70);
  //   pdf.text(`Surname: ${formData.personalData.surname}`, 10, 80);
  //   pdf.text(`Gender: ${formData.personalData.gender}`, 10, 90);
  //   pdf.text(`Family Status: ${formData.personalData.familyStatus}`, 10, 100);
  //   pdf.text(`Citizenship: ${formData.personalData.citizenship}`, 10, 110);
  //   pdf.text(
  //     `Military Service: ${formData.personalData.militaryService}`,
  //     10,
  //     120
  //   );
  //   pdf.text(`Email: ${formData.personalData.email}`, 10, 130);
  //   pdf.text(
  //     `Driver's License: ${formData.personalData.driverLicense}`,
  //     10,
  //     140
  //   );
  //   pdf.text(`City: ${formData.personalData.city}`, 10, 150);
  //   pdf.text(`Address: ${formData.personalData.address}`, 10, 160);
  //   pdf.text(`Landline Phone: ${formData.personalData.landlinePhone}`, 10, 170);
  //   pdf.text(`Mobile Phone: ${formData.personalData.mobilePhone}`, 10, 180);
  //   pdf.text(`LinkedIn: ${formData.personalData.linkedInLink}`, 10, 190);
  //   pdf.text(`Personal Bio: ${formData.personalData.personalBio}`, 10, 200);

  //   pdf.save("CV.pdf");
  // };
  //----------------------------------------------------------------------------------------------------------------- Check initialzation {for test use only}
  // const logFormData = () => {
  //   console.log(formData);
  // };
  //----------------------------------------------------------------------------------------------------------------- SubmitButton state changers

  //----------------------------------------------------------------------------------------------------------------- handleFormSubmit main fetch

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    formData.educations = educationSetsWithFlattenedData;
    formData.languages = transformedLanguageData;
    formData.computerKnowledges = transformedComputerLanguageData;
    formData.workExperiences = transformedWorkExperienceData;

    console.log(formData);
    try {
      const endpointUrl = "https://avazdg.tech:7201/api/CV/create-cv";

      const token = localStorage.getItem("token");

      if (!token) {
        alert(
          "Sizin sesiyanız sona catdı, xaiş edirik sistemə yenidən daxil olun!"
        );
        console.error("Token is missing");
        return;
      }

      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (response.ok) {
        alert("CV uğurla yaradıldı");
        console.log("Request successful", responseData);
      } else {
        alert("Qəza baş verdi!");
        console.error("Request failed", responseData);
      }
    } catch (error) {
      alert("Qəza baş verdi!");
      console.error("Error:", error);
      console.log("CatchError: ");
    }
  };
  //----------------------------------------------------------------------------------------------------------------- Get data by fetch

  // const getData = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const endpointUrl = "https://avazdg.tech:7201/api/CV/{cvId}";
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       alert(
  //         "Sizin sesiyanız sona catdı, xaiş edirik sistemə yenidən daxil olun!"
  //       );
  //       console.error("Token is missing");
  //       return;
  //     }

  //     const response = await fetch(endpointUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const responseData = await response.json();

  //     if (response.ok) {
  //       formData = responseData;
  //       // formData.personalData.name= responseData
  //       // formData.educations = educationSetsWithFlattenedData;
  //       // formData.languages = transformedLanguageData;
  //       // formData.computerKnowledges = transformedComputerLanguageData;
  //       // formData.workExperiences = transformedWorkExperienceData;
  //     }
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   }
  // };

  //--------------------------------------------------------------------------------------------------------------------- Manin body rendering
  const renderInputs = () => {
    switch (activeCategory) {
      case "personalData":
        return (
          <>
            <div className="gridInPerInfo">
              <ImageUploadContainer className="Image ">
                {image ? (
                  <ImagePreview src={image} alt="User" />
                ) : (
                  <>
                    <UploadText>Şəkil yüklə</UploadText>
                  </>
                )}
                <InputFile
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </ImageUploadContainer>
              <div className="PersonalDataDiv1">
                <Input
                  className={"NameInput cell"}
                  type="text"
                  placeholder={
                    formData.personalData.name === ""
                      ? "Ad"
                      : formData.personalData.name
                  }
                  value={formData.personalData.name}
                  onChange={(e) =>
                    handleInputChange("personalData", "name", e.target.value)
                  }
                />
                <Input
                  className={"FatherNameInput cell"}
                  type="text"
                  placeholder="Ata adı"
                  value={formData.personalData.fatherName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "fatherName",
                      e.target.value
                    )
                  }
                />
                <Input
                  className={"SurNameInput cell"}
                  type="text"
                  placeholder="Soyad"
                  value={formData.personalData.surname}
                  onChange={(e) =>
                    handleInputChange("personalData", "surname", e.target.value)
                  }
                />
                <Input
                  className={"EmailInput cell"}
                  type="email"
                  placeholder="Email"
                  value={formData.personalData.email}
                  onChange={(e) =>
                    handleInputChange("personalData", "email", e.target.value)
                  }
                />
                <Input
                  className={"mobilePhone cell"}
                  type="tel"
                  placeholder="+994551234567"
                  value={formData.personalData.mobilePhone}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "mobilePhone",
                      e.target.value
                    )
                  }
                />
                <Input
                  className={"address cell"}
                  type="text"
                  placeholder="Adres"
                  value={formData.personalData.address}
                  onChange={(e) =>
                    handleInputChange("personalData", "address", e.target.value)
                  }
                />
                <Input
                  className={"citizenship cell"}
                  type="text"
                  placeholder="Ölkə"
                  value={formData.personalData.citizenship}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "citizenship",
                      e.target.value
                    )
                  }
                />
                <Input
                  className={"landlinePhone cell"}
                  type="text"
                  placeholder="Şəhər telefonu"
                  value={formData.personalData.landlinePhone}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "landlinePhone",
                      e.target.value
                    )
                  }
                />

                <select
                  className={"militaryService cell"}
                  name="militaryService"
                  value={formData.personalData.militaryService}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "militaryService",
                      e.target.value
                    )
                  }
                >
                  <option value="">Əsgərlik statusu</option>
                  <option value="Hərbi mükəlləfiyyətli">
                    Hərbi mükəlləfiyyətli
                  </option>
                  <option value="Hərbi mükəlləfiyyətsiz">
                    Hərbi mükəlləfiyyətsiz
                  </option>
                </select>
              </div>

              <div className="PersonalDataDiv2">
                <select
                  className={"driverLicense cell"}
                  id="driverLicense"
                  name="driverLicense"
                  value={formData.personalData.driverLicense}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "driverLicense",
                      e.target.value
                    )
                  }
                >
                  <option value="">Sürücülük vəsiqəsi</option>
                  <option value="Var">Var</option>
                  <option value="Yox">Yox</option>
                </select>

                <Input
                  className={"city cell"}
                  type="text"
                  placeholder="Şəhər"
                  value={formData.personalData.city}
                  onChange={(e) =>
                    handleInputChange("personalData", "city", e.target.value)
                  }
                />

                <Input
                  className={"linkedInLink cell"}
                  type="text"
                  placeholder="Linkedin"
                  value={formData.personalData.linkedInLink}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "linkedInLink",
                      e.target.value
                    )
                  }
                />

                <select
                  className={"gender cell"}
                  id="gender"
                  name="gender"
                  value={formData.personalData.gender}
                  onChange={(e) =>
                    handleInputChange("personalData", "gender", e.target.value)
                  }
                >
                  <option value="">Cins</option>
                  <option value="Qadın">Qadın</option>
                  <option value="Kişi">Kişi</option>
                </select>

                <select
                  className={"familyStatus cell"}
                  id="familyStatus"
                  name="familyStatus"
                  value={formData.personalData.familyStatus}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "familyStatus",
                      e.target.value
                    )
                  }
                >
                  <option value="">Ailə vəziyyəti</option>
                  <option value="Evli">Evli</option>
                  <option value="Subay">Subay</option>
                  <option value="Dul">Dul</option>
                  <option value="Boşanmış">Boşanmış</option>
                </select>

                <Input
                  className={"personalBio cell2"}
                  type="text"
                  placeholder="Mənim haqqımda"
                  value={formData.personalData.personalBio}
                  onChange={(e) =>
                    handleInputChange(
                      "personalData",
                      "personalBio",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </>
        );
      case "Education":
        return (
          <>
            {educationSets.map((set, index) => (
              <FadeInGridItem key={set.id}>
                <h2>{set.name}</h2>
                <div className="EducationDivLayout">
                  {set.fields.map((field) => (
                    <div key={field.key}>
                      {field.className === "startDate" ||
                      field.className === "endDate" ? (
                        <DatePicker
                          key={field.key}
                          className={field.className}
                          selected={field.value ? new Date(field.value) : null}
                          dateFormat="dd/mm/yyyy"
                          placeholderText={field.placeholder}
                          type="text"
                          onChange={(date) =>
                            handleEducationSetInputChange(
                              set.id,
                              field.className,
                              date
                            )
                          }
                        />
                      ) : (
                        <Input
                          key={field.key}
                          className={field.className}
                          type="text"
                          placeholder={field.placeholder}
                          value={field.value || ""}
                          onChange={(e) =>
                            handleEducationSetInputChange(
                              set.id,
                              field.className,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                  {index !== 0 && (
                    <DeleteButton onClick={() => deleteEducationSet(set.id)}>
                      sil
                    </DeleteButton>
                  )}
                </div>
              </FadeInGridItem>
            ))}

            <AddButton onClick={addEducationSet}>Əlavə et</AddButton>
          </>
        );
      case "Language":
        return (
          <>
            <div className="LanguageDiv">
              <div className="LanguageKnowledgeDiv">
                {languageSets.map((set, index) => (
                  <FadeInGridItem key={set.id}>
                    <h2>{set.name}</h2>
                    {set.fields.map((field) => (
                      <div key={field.key}>
                        {field.key === 2 &&
                        field.className === "languageLevel" ? (
                          <select
                            key={field.key}
                            className={field.className}
                            value={field.value || ""}
                            onChange={(e) =>
                              handleLanguageSetInputChange(
                                set.id,
                                field.className,
                                e.target.value
                              )
                            }
                          >
                            <option value="">Dil bacarığı səviyyəsi</option>
                            <option value="Əla">Əla</option>
                            <option value="Yaxşı">Yaxşı</option>
                            <option value="Orta">Orta</option>
                            <option value="Pis">Pis</option>
                          </select>
                        ) : (
                          <Input
                            key={field.key}
                            className={field.className}
                            type="text"
                            placeholder={field.placeholder}
                            value={field.value || ""}
                            onChange={(e) =>
                              handleLanguageSetInputChange(
                                set.id,
                                field.className,
                                e.target.value
                              )
                            }
                          />
                        )}
                      </div>
                    ))}
                    {index !== 0 && (
                      <DeleteButton onClick={() => deleteLanguageSet(set.id)}>
                        sil
                      </DeleteButton>
                    )}
                  </FadeInGridItem>
                ))}
                <AddButton onClick={addLanguageSet}>Əlavə et</AddButton>
              </div>

              <div className="ComputerLanguageKnowledgeDiv">
                {ComputerlanguageSets.map((set, index) => (
                  <FadeInGridItem key={set.id}>
                    <h2>{set.name}</h2>
                    {set.fields.map((field) => (
                      <div key={field.key}>
                        {field.key === 2 &&
                        field.className === "knowledgeLevel" ? (
                          <select
                            key={field.key}
                            className={field.className}
                            value={field.value || ""}
                            onChange={(e) =>
                              handleComputerLanguageSetInputChange(
                                set.id,
                                field.className,
                                e.target.value
                              )
                            }
                          >
                            <option value="">
                              Komputer bacarığı səviyyəsi
                            </option>
                            <option value="Əla">Əla</option>
                            <option value="Yaxşı">Yaxşı</option>
                            <option value="Orta">Orta</option>
                            <option value="Pis">Pis</option>
                          </select>
                        ) : (
                          <Input
                            key={field.key}
                            className={field.className}
                            type="text"
                            placeholder={field.placeholder}
                            value={field.value || ""}
                            onChange={(e) =>
                              handleComputerLanguageSetInputChange(
                                set.id,
                                field.className,
                                e.target.value
                              )
                            }
                          />
                        )}
                      </div>
                    ))}
                    {index !== 0 && (
                      <DeleteButton
                        onClick={() => deleteComputerLanguageSet(set.id)}
                      >
                        sil
                      </DeleteButton>
                    )}
                  </FadeInGridItem>
                ))}

                <AddButton onClick={addComputerLanguageSet}>Əlavə et</AddButton>
              </div>
            </div>
          </>
        );
      case "workExperience":
        return (
          <>
            <div className="workExperienceDiv">
              {workExperienceSets.map((set, index) => (
                <FadeInGridItem key={set.id}>
                  <h2>{set.name}</h2>
                  <div className="workExperienceDivLayout">
                    {set.fields.map((field) => (
                      <div key={field.key}>
                        {field.className === "startDate" ||
                        field.className === "endDate" ? (
                          <DatePicker
                            key={field.key}
                            className={field.className}
                            selected={
                              field.value ? new Date(field.value) : null
                            }
                            dateFormat="dd/MM/yyyy"
                            placeholderText={field.placeholder}
                            onChange={(date) =>
                              handleWorkExperienceSetInputChange(
                                set.id,
                                field.className,
                                date
                              )
                            }
                          />
                        ) : (
                          <Input
                            key={field.key}
                            className={field.className}
                            type="text"
                            placeholder={field.placeholder}
                            value={field.value || ""}
                            onChange={(e) =>
                              handleWorkExperienceSetInputChange(
                                set.id,
                                field.className,
                                e.target.value
                              )
                            }
                          />
                        )}
                      </div>
                    ))}
                    {index !== 0 && (
                      <DeleteButton
                        onClick={() => deleteworkExperienceSet(set.id)}
                      >
                        sil
                      </DeleteButton>
                    )}
                  </div>
                </FadeInGridItem>
              ))}
              <AddButton onClick={addworkExperienceSet}>Əlavə et</AddButton>
            </div>
          </>
        );

      case "Finish":
        return (
          <>
            <SubmitButton onClick={handleFormSubmit}>Yarat</SubmitButton>
            {/*<button onClick={getData}>Initialize</button> */}
          </>
        );
      default:
        return (
          <>
            <div className="typewriter">
              <h1>AVAZ ilə cv yaradın və karyeranızı bizimlə inkişaf edin!</h1>

              <img
                className="CVmainImage"
                src="./assets/img/WallPaper/PngItem_2159037.png"
                alt=""
              />
            </div>
          </>
        );
    }
  };
  //--------------------------------------------------------------------------------------------------------------------- Flow menue settings
  //--------------------------------------------------------------------------------------------------------------------- Logout func
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    navigate("/login");
  };

  //--------------------------------------------------------------------------------------------------------------------- Main body
  return (
    <>
      <HeaderContainer>
        <BouncingImage
          className="DefaultImage2"
          src={"./assets/img/Avaz-Logo.png"}
          alt="Default"
        />
        <p className="AvazDGHedder">Avaz DG</p>
        <MenuButton onClick={handleLogout} />
      </HeaderContainer>

      <div className="buttonDiv">
        <Button
          onClick={() => handleCategoryClick("personalData", 0)}
         
        >
          Şəxsi Məlumatlar
        </Button>

        <Button
          onClick={() => handleCategoryClick("Education", 1)}
          active={activeButton === 1}
        >
          Təhsil
        </Button>

        <Button
          onClick={() => handleCategoryClick("Language", 2)}
          active={activeButton === 2}
        >
          Komputer Və Dil Bilikləri
        </Button>

        <Button
          onClick={() => handleCategoryClick("workExperience", 3)}
          active={activeButton === 3}
        >
          İş Təcrübəsi
        </Button>

        <Button
          onClick={() => handleCategoryClick("Finish", 4)}
          active={activeButton === 4}
        >
          Təstiqləmək
        </Button>
      </div>
      <Container key={activeButton}>{renderInputs()}</Container>
    </>
  );
};

export default CVPageMain;
