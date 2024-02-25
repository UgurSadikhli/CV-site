import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import "./CVPageMain.css";

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
  box-shadow: 0 4px 10px rgba(0.6, 0, 0, 0.6);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-around;
  align-items: center;
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
  font-family: Sans-serif;
  transition: border-color 0.3s ease;
  width: 200px;
  &:hover {
    border-color: #8cb9bd;
  }
  &::placeholder {
    color: white;
  }
  &::focus {
    border-color: #8cb9bd;
  }
`;
const ImageUploadContainer = styled.div`
  width: 150px;
  height: 200px;
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
`;
const SubmitButton = styled.button`
  background-color: #2e7eed;
  color: white;
  border: none;
  padding: 12px;
  width: 240px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.6s ease;

  &:hover {
    background-color: #4fa3ff;
    color: #white;
  }
`;
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
  &:focus {
    outline: none;
    color: #0b666a;
  }
`;
const UserIcoButton = styled.img`
  width: 30px;
  height: 35px;
  margin-left: 84%;
  margin-top: 0.5%;
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 8px 16px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #d14848;
  }
`;
const AddButton = styled.button`
  margin-top: 1%;
  margin-left: 90%;
  padding: 12px 24px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #45a049;
  }
`;
const DropdownMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 10px;
  z-index: 1;
`;
const GridItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  position: relative;
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
const MenuItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
//----------------------------------------------------------------------------------------------------

const CVPageMain = () => {
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
    { name: "Təhsil forma", fields: initialFieldTemplate },
  ]);

  const generateUniqueId = () => {
    return new Date().getTime();
  };

  const addEducationSet = () => {
    const newSetId = generateUniqueId();
    const newSetName = `Təhsil forma`;
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
    {
      key: 3,
      className: "languageCertificateID",
      placeholder: "Dil sertifikatının ID-si",
    },
  ];

  const [languageSets, setLanguageSets] = useState([
    { name: "Biliklər forması", fields: initialLanguageFieldTemplate },
  ]);

  const addLanguageSet = () => {
    const newSetId = generateUniqueId();
    const newSetName = `Biliklər forma`;
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
    {
      key: 3,
      className: "knowledgeCertificateID",
      placeholder: "Komputer bacarığı sertifikatının ID-si",
    },
  ];
  const [ComputerlanguageSets, setComputerLanguageSets] = useState([
    { name: "Biliklər forması", fields: initialComputerLanguageFieldTemplate },
  ]);
  const addComputerLanguageSet = () => {
    const newSetId = generateUniqueId();
    const newSetName = `Biliklər forma`;
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
    { name: "Is forması", fields: initialWorkExperienceFieldTemplate },
  ]);
  const addworkExperienceSet = () => {
    const newSetId = generateUniqueId();
    const newSetName = `Is forma`;
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
  console.log(educationSetsWithFlattenedData);

  const transformedLanguageData = flattenSets(languageSets);
  console.log(transformedLanguageData);

  const transformedComputerLanguageData = flattenSets(ComputerlanguageSets);
  console.log(transformedComputerLanguageData);

  const transformedWorkExperienceData = flattenSets(workExperienceSets);
  console.log(transformedWorkExperienceData);

  //---------------------------------------------------------------------------------------------------------- DB fetch
  const userID = localStorage.getItem("userID");
  const [formData, setFormData] = useState({
    userID: userID,
    personalData: {
      personPhoto: "@///url/test",
      name: "",
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
  const handleInputChange = (category, fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [category]: {
        ...prevFormData[category],
        [fieldName]: value,
      },
    }));
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpointUrl = "http://avazdg.tech:5201/api/CV/create-cv";
      const token = localStorage.getItem("token");

      if (!token) {
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

      if (response.ok) {
        console.log("Request successful", responseData);
      } else {
        console.error("Request failed", responseData);
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("CatchError: ");
    }
  };

  //--------------------------------------------------------------------------------------------------------------- Button active modification

  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category, index) => {
    setActiveCategory(category);
    handleButtonClick(index);
  };

  //----------------------------------------------------------------------------------------------------------------- Check initialzation {for test use only}
  const logFormData = () => {
    for (const educationSet of languageSets) {
      for (const field of educationSet.fields) {
        console.log(field);
      }
    }
  };

  //--------------------------------------------------------------------------------------------------------------------- Manin body rendering
  const renderInputs = () => {
    switch (activeCategory) {
      case "personalData":
        return (
          <>
            <ImageUploadContainer className="Image">
              {image ? (
                <ImagePreview src={image} alt="User" />
              ) : (
                <>
                  <UploadText>Upload Image</UploadText>
                </>
              )}
              <InputFile
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </ImageUploadContainer>
            <Input
              className={"NameInput"}
              type="text"
              placeholder="Ad"
              value={formData.personalData.name}
              onChange={(e) =>
                handleInputChange("personalData", "name", e.target.value)
              }
            />
            <Input
              className={"SurNameInput"}
              type="text"
              placeholder="Soyad"
              value={formData.personalData.surname}
              onChange={(e) =>
                handleInputChange("personalData", "surname", e.target.value)
              }
            />
            <Input
              className={"EmailInput"}
              type="email"
              placeholder="Email"
              value={formData.personalData.email}
              onChange={(e) =>
                handleInputChange("personalData", "email", e.target.value)
              }
            />
            <Input
              className={"mobilePhone"}
              type="tel"
              placeholder="Telefon"
              value={formData.personalData.mobilePhone}
              onChange={(e) =>
                handleInputChange("personalData", "mobilePhone", e.target.value)
              }
            />
            <Input
              className={"address"}
              type="text"
              placeholder="Adres"
              value={formData.personalData.address}
              onChange={(e) =>
                handleInputChange("personalData", "address", e.target.value)
              }
            />
            <Input
              className={"citizenship"}
              type="text"
              placeholder="Ölkə"
              value={formData.personalData.citizenship}
              onChange={(e) =>
                handleInputChange("personalData", "citizenship", e.target.value)
              }
            />
            <Input
              className={"landlinePhone"}
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
            <Input
              className={"militaryService"}
              type="text"
              placeholder="Əsgərlik statusu"
              value={formData.personalData.militaryService}
              onChange={(e) =>
                handleInputChange(
                  "personalData",
                  "militaryService",
                  e.target.value
                )
              }
            />
            <Input
              className={"driverLicense"}
              type="text"
              placeholder="Sürücülük vəsiqəsi"
              value={formData.personalData.driverLicense}
              onChange={(e) =>
                handleInputChange(
                  "personalData",
                  "driverLicense",
                  e.target.value
                )
              }
            />
            <Input
              className={"city"}
              type="text"
              placeholder="Şəhər"
              value={formData.personalData.city}
              onChange={(e) =>
                handleInputChange("personalData", "city", e.target.value)
              }
            />
            <Input
              className={"personalBio"}
              type="text"
              placeholder="Mənim hakqımda"
              value={formData.personalData.personalBio}
              onChange={(e) =>
                handleInputChange("personalData", "personalBio", e.target.value)
              }
            />
            <Input
              className={"linkedInLink"}
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
              className={"gender"}
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
              className={"familyStatus"}
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
          </>
        );
      case "Education":
        return (
          <>
            {educationSets.map((set) => (
              <FadeInGridItem key={set.id}>
                <h2>{set.name}</h2>
                {set.fields.map((field) => (
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
                ))}
                <DeleteButton onClick={() => deleteEducationSet(set.id)}>
                  sil
                </DeleteButton>
              </FadeInGridItem>
            ))}
            <AddButton onClick={addEducationSet}>Əlavə et</AddButton>
          </>
        );
      case "Language":
        return (
          <>
            {languageSets.map((set) => (
              <FadeInGridItem key={set.id}>
                <h2>{set.name}</h2>
                {set.fields.map((field) => (
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
                ))}
                <DeleteButton onClick={() => deleteLanguageSet(set.id)}>
                  sil
                </DeleteButton>
              </FadeInGridItem>
            ))}
            <AddButton onClick={addLanguageSet}>Əlavə et dil</AddButton>
            {ComputerlanguageSets.map((set) => (
              <FadeInGridItem key={set.id}>
                <h2>{set.name}</h2>
                {set.fields.map((field) => (
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
                ))}
                <DeleteButton onClick={() => deleteComputerLanguageSet(set.id)}>
                  sil
                </DeleteButton>
              </FadeInGridItem>
            ))}
            <AddButton onClick={addComputerLanguageSet}>
              Əlavə et komp
            </AddButton>
          </>
        );
      case "workExperience":
        return (
          <>
            {workExperienceSets.map((set) => (
              <FadeInGridItem key={set.id}>
                <h2>{set.name}</h2>
                {set.fields.map((field) => (
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
                ))}
                <DeleteButton onClick={() => deleteworkExperienceSet(set.id)}>
                  sil
                </DeleteButton>
              </FadeInGridItem>
            ))}
            <AddButton onClick={addworkExperienceSet}>Əlavə et</AddButton>
          </>
        );

      case "Finish":
        return (
          <>
            <SubmitButton className="SubmitButton" onClick={handleFormSubmit}>
              Yarat
            </SubmitButton>
          </>
        );
      default:
        return (
          <>
            <div className="typewriter">
              <h1>Avaz ilə CV yaradın və Karyeranızı Bizimlə İnkişaf Edin!</h1>
              <img className="CVmainImage" src="./assets/img/WallPaper/PngItem_2159037.png" alt="" />
            </div>
          </>
        );
    }
  };
  //--------------------------------------------------------------------------------------------------------------------- Flow menue settings
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick4 = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        <UserIcoButton
          src="./assets/img/menu.png"
          onClick={handleButtonClick4}
        ></UserIcoButton>
        <DropdownMenu className="place" isOpen={isMenuOpen}>
          <MenuItem>
            <img
              onClick={handleLogout}
              className="optionImages"
              src="./assets/img/sign-out.png"
            />
          </MenuItem>
        </DropdownMenu>
      </HeaderContainer>

      <div className="buttonDiv">
        <Button
          onClick={() => handleCategoryClick("personalData", 0)}
          active={activeButton === 0}
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
