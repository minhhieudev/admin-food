import "./style.css";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  ServiceActions,
  ServiceSelectors,
} from "../../app/services/service/service.slice";
import MST from "../../components";
import Editor from "../../components/base/editor/Editor";
import Select from "../../components/base/select/Select";
import TableCreateService from "../../components/table-create-service/TableCreateService";
import ServiceCreateCreateServiceGroupModal from "./ServiceCreate.CreateServiceGroupModal";
import ServiceCreateCreateServiceTagModal from "./ServiceCreate.CreateServiceTagModal";
import { SubdescriptionMealActions, subdescriptionMealSelectors } from "../../app/services/subdescription-meal/subdescriptionMeal.slice";
import { IngredientActions, IngredientSelectors } from "../../app/services/ingredient/ingredient.slice";
import {
  TrashIcon
} from "@heroicons/react/24/outline";
import axios from 'axios';

function ServiceCreatePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serviceDetail = useSelector(ServiceSelectors.serviceDetail);
  const serviceGroupList = useSelector(ServiceSelectors.serviceGroup);
  const serviceList = useSelector(ServiceSelectors.scriptGroupCodeList);
  const serviceTagsList = useSelector(ServiceSelectors.serviceTags);
  const Ingredients = useSelector(IngredientSelectors.ingredients);

  /////////////////////////
  const ListSubMeal = useSelector(subdescriptionMealSelectors.subMealForSelect);

  const getData = () => {
    dispatch(ServiceActions.getCreateInfo());
  };

  const [status, setStatus] = useState(false);
  const [isBestSellers, setIsBestSellers] = useState(false);
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [type, setType] = useState({
    name: "Chạy dịch vụ",
    value: "runService",
  });
  ///////////////////////
  const [typeMeal, setTypeMeal] = useState({});
  const [mainImage, setMainImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [ListIngredient, setListIngredient] = useState([])
  const [images, setImages] = useState([])

  const [description, setDescription] = useState("");
  const [orderSuccessDescription, setOrderSuccessDescription] = useState("");
  const [scriptGroupCode, setScriptGroupCode] = useState(undefined);
  const [serviceGroupID, setServiceGroupID] = useState();
  const [serviceTags, setServiceTags] = useState([]);
  const [unit, setUnit] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [vipPrice, setVipPrice] = useState("");
  const [originPrice, setoriginPrice] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    price: "",
  });
  useEffect(() => {
    getData();
    dispatch(
      SubdescriptionMealActions.getForSelect()
    );
    dispatch(
      IngredientActions.getForSelect()
    );
  }, []);

  useEffect(() => {
    if (serviceDetail) {
      setStatus(serviceDetail?.status);
      setIsBestSellers(serviceDetail?.isBestSellers);
      setName(serviceDetail?.name);
      setTypeMeal(serviceDetail?.subscriptionID?._id);
      setListIngredient(
        serviceDetail?.ingredientList.map((x) => x?._id
        ))

      setTypeMeal(ListSubMeal.find(item => item._id === serviceDetail?.subscriptionID?._id) || '');
      setMainImage(serviceDetail?.mainImage);
      setImageFile(`${process.env.REACT_APP_CDN_URL}${serviceDetail?.mainImage}`);
      setImages(serviceDetail?.images)
      setImageList(serviceDetail?.images)
      setAttributes(
        serviceDetail?.attributes.map((x) => {
          return {
            ...x,
            dataType: {
              name: x?.dataType,
              value: x?.dataType,
            },
            errorMessage: {
              label: "",
              code: "",
            },
          };
        })
      );

      setDescription(serviceDetail?.description);
      setOrderSuccessDescription(serviceDetail?.orderSuccessDescription);

      setUnit(serviceDetail?.unit);
      setUnit(serviceDetail?.cost);
      setPrice(Number(serviceDetail?.price));
      setVipPrice(serviceDetail?.vipPrice);
      setoriginPrice(serviceDetail?.originPrice);
      setMinValue(serviceDetail.minValue || "");
      setMaxValue(serviceDetail.maxValue || "");
    }
  }, [serviceDetail, serviceTagsList, serviceGroupList]);

  useEffect(() => {
    setScriptGroupCode(
      (() => {
        try {
          return serviceList.filter(
            (x) =>
              x.scriptGroupCode === serviceDetail?.scriptGroupCode &&
              x.scriptCode == serviceDetail?.scriptCode
          )[0];
        } catch (error) {
          return "";
        }
      })()
    );
  }, [serviceList]);

  useEffect(() => {
    if (serviceGroupID === undefined) {
      setServiceGroupID(
        (() => {
          try {
            return serviceGroupList.filter(
              (x) => x.value === serviceDetail?.serviceGroup?._id
            )[0];
          } catch (error) {
            return "";
          }
        })()
      );
    }
  }, [serviceDetail, serviceGroupList]);

  useEffect(() => {
    if (isEmpty(serviceTags)) {
      setServiceTags(
        (() => {
          try {
            return serviceTagsList.filter(
              (x) => (serviceDetail?.serviceTags || []).indexOf(x.name) > -1
            );
          } catch (error) {
            return "";
          }
        })()
      );
    }
  }, [serviceDetail, serviceTagsList]);

  const onChangeStatus = () => {
    setStatus(!status);
  };

  const onChangeIsBestSellers = () => {
    setIsBestSellers(!isBestSellers);
  };

  //
  const onChangeAttributes = useCallback(
    (data) => {
      setAttributes(data);
    },
    [attributes]
  );

  //
  const onAddAttributes = useCallback(() => {
    setAttributes([
      ...attributes,
      {
        id: `cd${Math.random()}`,
        label: "",
        code: "",
        dataType: {
          name: "",
          value: "",
        },
        description: "",
        required: false,
        errorMessage: {
          label: "",
          code: "",
        },
        commentType: false,
        options: [],
      },
    ]);
  }, [attributes]);

  //
  const renderTable = useMemo(() => {
    return (
      <TableCreateService
        data={attributes}
        onChange={onChangeAttributes}
        customPrice={serviceDetail?.customPrice}
      />
    );
  }, [attributes]);

  const validate = (callback) => {
    const tempEM = {
      name: "",
      price: "",
    };

    let errorCount = 0;

    if (isEmpty(name)) {
      errorCount++;
      tempEM.name = "Tên dịch vụ không được để trống";
    }

    if (price.length === 0) {
      errorCount++;
      tempEM.price = "Giá dịch vụ không được để trống";
    }

    if (price <= 0) {
      errorCount++;
      tempEM.price = "Giá dịch vụ không được nhỏ hơn 0";
    }

    if (!isEmpty(attributes)) {
      setAttributes(
        attributes.map((oneAtt) => {
          const tempMes = {
            label: "",
            code: "",
          };
          if (isEmpty(oneAtt.label)) {
            errorCount++;
            tempMes.label = "Tên không được bỏ trống";
          }

          if (isEmpty(oneAtt.code)) {
            errorCount++;
            tempMes.code = "Mã không được bỏ trống";
          }

          return {
            ...oneAtt,
            errorMessage: tempMes,
          };
        })
      );
    }

    if (errorCount == 0) {
      callback();
    } else {
      setErrorMessage(tempEM);
    }
  };

  const getCustomPrice = () => {
    const newCustomPrice = attributes.reduce((acc, attribute) => {
      const newAcc = [...acc];
      if (attribute.dataType?.value === "select" && attribute.options?.length) {
        attribute.options.map((option) => {
          newAcc.push({
            attributeCode: attribute.code,
            price: option.price?.value,
            customType: option.price?.amountType,
            mappingValue: option.value,
          });
        });
      }
      return newAcc;
    }, []);
    if (newCustomPrice.some((item) => !item.price)) {
      return serviceDetail.customPrice;
    }
    return newCustomPrice;
  };

  const onCreate = () => {
    dispatch(
      ServiceActions.createService({
        onSuccess: (id) => {
          toast.success("Tạo mới gói dịch vụ thành công");
          navigate(`/services/services/edit/${id}`);
        },
        body: {
          status,
          isBestSellers,
          name, // tên dịch vụ
          code: "sv1",
          description,
          orderSuccessDescription,
          scriptGroupCode: scriptGroupCode?.scriptGroupCode,
          scriptCode: scriptGroupCode?.scriptCode,
          serviceCode: scriptGroupCode?.serviceCode,
          serviceGroupID: serviceGroupID?.value,
          serviceTags: serviceTags.map((x) => x.name),
          partnerServiceID: scriptGroupCode?.partnerServiceID,
          unit,
          cost,
          price,
          vipPrice,
          originPrice,
          type: type?.value, //loại dịch vụ
          attributes: attributes.map((x) => {
            return {
              ...x,
              dataType: x?.dataType?.value,
            };
          }),
          minValue: minValue || 0,
          maxValue: maxValue || 0,
          customPrice: getCustomPrice(),
          //////
          subscriptionID: typeMeal?._id,
          mainImage: mainImage,
          images: images,
          ingredientList: ListIngredient
        },
      })
    );
  };
  ////////////////////////////////////////////////////////
  const handleMultipleImagesChange = (event) => {
    const files = event.target.files;
    if (files) {
      setImages((prevList) => [...prevList, ...files]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
  };

  const uploadImage = async () => {
    if (!mainImage) {
      toast.error("Chưa chọn ảnh để upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', mainImage);

      axios.post(`${process.env.REACT_APP_SC_BACKEND_API}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          const imageUrl = response.data.data.url;
          const imageName = imageUrl.split('/').pop();
          setMainImage(imageName);
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
  const handleUploadMany = async () => {
    if (images.length === 0) {
      toast.error("Chưa chọn ảnh để upload");
      return;
    }

    try {
      const uploadPromises = images.map((file) => {
        const formData = new FormData();
        formData.append('files', file);

        return axios.post(`${process.env.REACT_APP_SC_BACKEND_API}/api/upload/multiple`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      });

      Promise.all(uploadPromises)
        .then((responses) => {
          const uploadedImageUrls = responses.map((response) => String(response.data.data.urls));
          const imageNames = uploadedImageUrls.map((url) => url.split('/').pop()); 
          setImages(imageNames);
          setImageList(uploadedImageUrls); 
          toast.success("Upload ảnh thành công");
        })
        .catch((error) => {
          console.error('Error uploading files:', error);
          toast.error("Lỗi khi upload ảnh");
        });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Lỗi khi upload ảnh");
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
    setImageList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };
  const handleIngredientChange = (e, ingredient) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setListIngredient((prevList) => [...prevList, ingredient._id]);
    } else {
      setListIngredient((prevList) =>
        prevList.filter((id) => id !== ingredient._id)
      );
    }
  };

  const onEdit = () => {
    dispatch(
      ServiceActions.edit({
        onSuccess: () => {
          toast.success("Cập nhật gói dịch vụ thành công");
        },
        id: serviceDetail._id,
        body: {
          status,
          isBestSellers,
          name, // tên dịch vụ
          code: "sv1",
          description,
          orderSuccessDescription,
          scriptGroupCode: scriptGroupCode?.scriptGroupCode,
          scriptCode: scriptGroupCode?.scriptCode,
          serviceCode: scriptGroupCode?.serviceCode,
          serviceGroupID: serviceGroupID?.value,
          serviceTags: serviceTags.map((x) => x.name),
          partnerServiceID: scriptGroupCode?.partnerServiceID,
          unit,
          cost,
          price,
          vipPrice,
          originPrice,
          type: type?.value, //loại dịch vụ
          attributes: attributes.map((x) => {
            return {
              ...x,
              dataType: x?.dataType?.value,
            };
          }),
          minValue: Number(minValue) || 0,
          maxValue: Number(maxValue) || 0,
          customPrice: getCustomPrice(),
          //////
          subscriptionID: typeMeal?._id,
          mainImage: mainImage,
          images: images,
          ingredientList: ListIngredient
        },
      })
    );
  };

  return (
    <MST.Container
      title={serviceDetail ? "Cập nhật dịch vụ" : "Tạo mới dịch vụ"}
      right={
        <div className="d-flex">
          <MST.Button
            onClick={() => navigate("/services/services")}
            type="outlined"
            className="mr-8"
          >
            Huỷ
          </MST.Button>
          <MST.Button
            onClick={
              serviceDetail ? () => validate(onEdit) : () => validate(onCreate)
            }
          >
            Lưu lại
          </MST.Button>
        </div>
      }
    >
      <div className="service-create-content-container">
        <div className="service-create-content-left">
          <div className="service-create-content">
            <div className="service-create-title">Thông tin dịch vụ</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Tên dịch vụ<span className="color-red"> *</span>
              </div>
              <div>
                <MST.Input
                  errorMessage={errorMessage?.name}
                  placeholder="Nhập tên dịch vụ"
                  maxLength={225}
                  value={name}
                  onChange={(e) => {
                    setErrorMessage({
                      ...errorMessage,
                      name: "",
                    });
                    setName(e.target.value);
                  }}
                />
                <div style={{ color: "#72777A", marginTop: 8 }}>
                  {name.length}/225
                </div>
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Giá<span className="color-red"> *</span>
              </div>
              <div>
                <MST.Input
                  type="number"
                  errorMessage={errorMessage?.price}
                  placeholder="Nhập giá"
                  value={price}
                  onChange={(e) => {
                    setErrorMessage({
                      ...errorMessage,
                      price: "",
                    });
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="service-create-content">
            <div className="service-create-title">Giá dịch vụ</div>

            <div
              className="service-create-one-field"
              style={{ display: "flex", flex: 1 }}
            >
              <div
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <div className="service-create-one-field-name">Giá gốc</div>
                <div>
                  <MST.Input
                    type="number"
                    placeholder="Nhập giá gốc"
                    value={originPrice}
                    onChange={(e) => setoriginPrice(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  marginLeft: 16,
                }}
              >
                <div className="service-create-one-field-name">
                  Giá cho khách hàng VIP
                </div>
                <div>
                  <MST.Input
                    type="number"
                    placeholder="Nhập giá vip"
                    value={vipPrice}
                    onChange={(e) => setVipPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="service-create-one-field" style={{ display: "flex", flex: 1 }}>
              <div
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <div className="service-create-one-field-name">Chi phí</div>
                <div>
                  <MST.Input
                    placeholder="Nhập chi phí"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="service-create-content">
            <div className="d-flex jc-between ai-center">
              <div className="service-create-title">
                Dữ liệu nhập vào của khách hàng
              </div>
              <div>
                <MST.Button onClick={onAddAttributes}>
                  Thêm thuộc tính
                </MST.Button>
              </div>
            </div>
            <div className="pt-20">{renderTable}</div>
          </div>

          <div className="service-create-content">
            <div className="service-create-title">Mô tả dịch vụ</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">Mô tả</div>
              <div>
                <Editor
                  placeholder="Nhập mô tả"
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
                />
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Mô tả sau khi đặt hàng
              </div>
              <div>
                <Editor
                  placeholder="Nhập mô tả sau khi đặt hàng"
                  onBlur={(eventInfo, editor) => {
                    const data = editor?.getData();
                    const valueTrim = data?.trim();
                    if (isEmpty(data)) {
                      editor.setData("");
                      return;
                    }
                    setOrderSuccessDescription(valueTrim);
                  }}
                  data={orderSuccessDescription || ""}
                />
              </div>
            </div>
          </div>
          <div className="service-create-content">
            <div className="service-create-title">Upload hình ảnh</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Ảnh chính
              </div>
              <div className="content">
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="button" onClick={uploadImage} className="mt-3">
                  Upload
                </button>
                <div className="mt-2">
                  <img src={imageFile || ''} alt="Uploaded" width="100" />
                </div>

              </div>
            </div>
            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Danh sách ảnh phụ
              </div>
              <div className="content">
                <input
                  type="file"
                  onChange={handleMultipleImagesChange}
                  multiple
                />
                <button
                  type="button"
                  onClick={handleUploadMany}
                  className="mt-3"
                >
                  Upload
                </button>
                <div className="list-image">
                  {imageList?.map((file, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={file}
                        alt="Preview"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <TrashIcon width={16} height={16} color="#FF5247" onClick={() => handleRemoveImage(index)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="service-create-content-right">
          <div className="service-create-content">
            <div className="service-create-title">Trạng thái</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">Sẵn sàn bán</div>
              <MST.Switch enable={status} onClick={onChangeStatus} />
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Đặt thành dịch vụ hot
              </div>
              <MST.Switch
                enable={isBestSellers}
                onClick={onChangeIsBestSellers}
              />
            </div>
          </div>

          <div className="service-create-content">
            <div className="service-create-title">Phân loại</div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Loại gói đăng ký<span className="color-red"> *</span>
              </div>
              <div>
                <Select.Simple
                  placeholder="Chọn loại gói"
                  selected={typeMeal}
                  setSelected={setTypeMeal}
                  width={"100%"}
                  data={ListSubMeal}
                />
              </div>
            </div>
            {/* <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Dịch vụ gốc<span className="color-red"> *</span>
              </div>
              {isLoadingService ? (
                <div
                  style={{
                    color: "#00000090",
                  }}
                >
                  Đang lấy thông tin dịch vụ gốc...
                </div>
              ) : (
                <div>
                  <Select.Simple
                    placeholder="Chọn loại dịch vụ gốc"
                    width={"100%"}
                    data={serviceList.map((x) => {
                      return {
                        ...x,
                        value: x?.scriptCode,
                        icon: (
                          <img
                            style={{
                              marginRight: 12,
                              width: 24,
                              height: 24,
                            }}
                            src={`${CONST.URL.API}/images/services/${x.scriptGroupCode}.png`}
                          />
                        ),
                      };
                    })}
                    selected={scriptGroupCode}
                    setSelected={setScriptGroupCode}
                    selectShowOptionsStyles={{ maxHeight: 400 }}
                  />
                </div>
              )}
            </div> */}

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">
                Nhóm dịch vụ
              </div>
              <div className="d-flex-col">
                <Select.Simple
                  canRemove
                  onRemove={(value) => {
                    dispatch(
                      ServiceActions.deleteServiceGroup({
                        id: value,
                      })
                    );
                  }}
                  placeholder="Chọn nhóm dịch vụ"
                  selected={serviceGroupID}
                  setSelected={setServiceGroupID}
                  width={"100%"}
                  data={serviceGroupList}
                />
                <div style={{ marginTop: 8 }}>
                  <ServiceCreateCreateServiceGroupModal
                    serviceGroupID={serviceGroupID}
                    setServiceGroupID={setServiceGroupID}
                  />
                </div>
              </div>
            </div>

            <div className="service-create-one-field">
              <div className="service-create-one-field-name">Thẻ dịch vụ</div>
              <div className="d-flex-col">
                <Select.Multiple
                  placeholder="Chọn thẻ dịch vụ"
                  setSelectedList={setServiceTags}
                  selectedList={serviceTags}
                  width={"100%"}
                  data={serviceTagsList}
                />
                <div style={{ marginTop: 8 }}>
                  <ServiceCreateCreateServiceTagModal
                    serviceTags={serviceTags}
                    setServiceTags={setServiceTags}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="service-create-content">
            <div className="service-create-title">Chọn thành phần</div>

            <div className="list-ingredient mt-3">
              {Ingredients?.map((ingredient) => (
                <div key={ingredient._id} className="ingredient-checkbox">
                  <input
                    type="checkbox"
                    id={ingredient._id}
                    value={ingredient._id}
                    //checked={selectedTags.includes(tag.value)} 
                    checked={ListIngredient.includes(ingredient._id)}
                    onChange={(e) => handleIngredientChange(e, ingredient)}
                  />
                  <label htmlFor={ingredient._id}>{ingredient.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MST.Container>
  );
}

export default ServiceCreatePage;
