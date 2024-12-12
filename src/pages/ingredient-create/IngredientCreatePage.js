import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceCreateCreateIngredientGroupModal from "./IngredientCreate.CreateIngredientGroupModal";
import CreateIngredientTagModal from "./IngredientCreate.CreateIngredientTagModal";
import Select from "../../components/base/select/Select";
import {
  IngredientActions,
  IngredientSelectors,
} from "../../app/services/ingredient/ingredient.slice";
import MST from "../../components";
import Editor from "../../components/base/editor/Editor";
import "./style.css";
import axios from 'axios';
import {
  TrashIcon
} from "@heroicons/react/24/outline";

const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str.toLowerCase().replace(/ /g, "-");
};

function IngredientCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ingredientGroupID, setIngredientGroupID] = useState();
  const ingredientGroupList = useSelector(IngredientSelectors.listGroup);
  const ingredientTagList = useSelector(IngredientSelectors.listTag);

  const ingredientDetail = useSelector(
    IngredientSelectors.ingredientDetail
  );

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [iGroupID, setIGroupID] = useState('');
  const [iTags, setITags] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    if (ingredientDetail) {
      setDescription(ingredientDetail?.description);
      setImage(ingredientDetail?.image);
      setImageFile(`${process.env.REACT_APP_CDN_URL}${ingredientDetail?.image}`);
      setName(ingredientDetail?.name);
      setCode(ingredientDetail?.code);
      setITags(ingredientDetail?.iTags);
      setSelectedTags(ingredientDetail?.iTags || []);
      setIGroupID(ingredientGroupList.find(group => group.value === ingredientDetail.iGroupID) || '');
    }
  }, [ingredientDetail]);

  // Lấy dữ liệu cho select
  useEffect(() => {
    dispatch(
      IngredientActions.getCreateInfo()
    );
  }, [dispatch]);

  const validate = (callback) => {
    const tempEM = {
      name: "",
      iGroupID: "",
      iTags: "",
    };

    let errorCount = 0;

    if (isEmpty(name)) {
      errorCount++;
      tempEM.name = "Tên thành phần không được để trống";
    }

    if (isEmpty(iGroupID)) {
      errorCount++;
      toast.error("Vui lòng chọn nhóm thành phần");
    }

    if (isEmpty(selectedTags)) {
      errorCount++;
      toast.error("Vui lòng chọn tag");

    }

    setErrorMessage(tempEM);

    if (errorCount === 0) {
      callback();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) {
      toast.error("Chưa chọn ảnh để upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      console.log('Data', imageFile.name)
      axios.post(`${process.env.REACT_APP_SC_BACKEND_API}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          const imageUrl = response.data.data.url;
          const imageName = imageUrl.split('/').pop();
          setImage(imageName);
          setImageFile(imageUrl);
          toast.success("Upload thành công");

        })
        .catch((error) => {
          console.error('Error uploading the file:', error);
          toast.error("Lỗi khi upload ảnh");
        });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Lỗi khi upload ảnh");
    }
  };

  const onCreate = () => {
    dispatch(
      IngredientActions.createIngredient({
        onSuccess: (id) => {
          toast.success("Tạo mới thành phần thành công");
          //navigate(`/services/ingredients`);
        },
        body: {
          name,
          code,
          image,
          description,
          iGroupID: iGroupID?.value,
          iTags: selectedTags
        },
      })
    );
  };

  const onEdit = () => {
    dispatch(
      IngredientActions.edit({
        onSuccess: () => {
          toast.success("Cập nhật thành phần thành công");
          navigate(`/services/ingredients`);
        },
        id: ingredientDetail._id,
        body: {
          name,
          code,
          image,
          description,
          iGroupID: iGroupID.value,
          iTags: selectedTags
        },
      })
    );
  };

  const handleTagChange = (e, id) => {
    if (e.target.checked) {
      setSelectedTags([...selectedTags, id]);
    } else {
      setSelectedTags(selectedTags.filter(tagId => tagId !== id));
    }
  };

  const deleteTag = (id) => {
    dispatch(
      IngredientActions.deleteIngredientTag({
        id: id,
      })
    );
  }

  return (
    <MST.Container
      title={ingredientDetail ? "Cập nhật thành phần" : "Thêm thành phần"}
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/services/ingredients")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button
            onClick={
              ingredientDetail
                ? () => validate(onEdit)
                : () => validate(onCreate)
            }
          >
            Lưu lại
          </MST.Button>
        </div>
      }
    >
      <div className="ingredient-create-content">
        <div className="ingredient-create-one-field">
          <div className="modal-body">
            <div className="mb-8">Tên thành phần</div>
            <MST.Input
              value={name}
              onChange={(e) => {
                const inputName = e.target.value;
                setName(inputName);
                setCode(removeVietnameseTones(inputName));
              }}
              placeholder="Nhập tên thành phần"
              errorMessage={errorMessage.name}
            />
          </div>
          <div className="select">
            <div className="ingredient-create-one-field">
              <div className="ingredient-create-one-field-name">
                Chọn tag<span className="color-red"> *</span>
              </div>
              <div className="d-flex listTag">
                {ingredientTagList.map((tag) => (
                  <div key={tag.value} className="selectTag">
                    <div className="d-flex justify-content-center align-items-center">
                      <input
                        type="checkbox"
                        value={tag.value}
                        checked={selectedTags.includes(tag.value)} // Đánh dấu checkbox nếu tag nằm trong selectedTags
                        onChange={(e) => handleTagChange(e, tag.value)}
                      />
                      <label>{tag.iTagName}</label>
                    </div>
                    <TrashIcon size="small" className="icon" onClick={() => deleteTag(tag.value)} />
                  </div>
                ))}
              </div>


              <div style={{ marginTop: 8 }}>
                <CreateIngredientTagModal
                  serviceTagID={iTags}
                  setITags={setITags}
                />
              </div>
            </div>
            <div className="ingredient-create-one-field">
              <div className="ingredient-create-one-field-name">
                Nhóm thành phần<span className="color-red"> *</span>
              </div>
              <div className="d-flex-col">
                <Select.Simple
                  canRemove
                  onRemove={(value) => {
                    dispatch(
                      IngredientActions.deleteIngredientGroup({
                        id: value,
                      })
                    );
                  }}
                  placeholder="Chọn nhóm dịch vụ"
                  selected={iGroupID}
                  setSelected={setIGroupID}
                  width={"100%"}
                  data={ingredientGroupList}
                />

                <div style={{ marginTop: 8 }}>
                  <ServiceCreateCreateIngredientGroupModal
                    serviceGroupID={iGroupID}
                    setIGroupID={setIGroupID}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-body">
            <div className="mb-8">Mã thành phần</div>
            <MST.Input
              value={code}
              disabled={true}
            />
          </div>

          <div className="modal-body">
            <div className="mb-8">Ảnh</div>
            <div className="content">
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button type="button" onClick={uploadImage} className="buttonUpload" >
                Upload
              </button>
              {imageFile && (<div className="mt-2">
                <img src={imageFile || ''} alt="Uploaded" width="100" />
              </div>)}

            </div>
          </div>

          <div className="ingredient-create-one-field-name">
            Mô tả thành phần
          </div>
          <div>
            <Editor
              placeholder="Nhập mô tả thành phần"
              onBlur={(eventInfo, editor) => {
                const data = editor?.getData();
                const valueTrim = data?.trim();
                if (isEmpty(data)) {
                  editor.setData("");
                  return;
                }
                setDescription(valueTrim);
              }}
              data={description || ""}
              errorMessage={errorMessage.description}
            />
          </div>
         
        </div>
      </div>
    </MST.Container>
  );
}

export default IngredientCreatePage;
