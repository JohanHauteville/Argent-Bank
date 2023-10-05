import { useSelector, useDispatch } from "react-redux";
import * as editProfileButtonActions from "../../features/editButton";
import "./styles.scss";

function EditProfileButton() {
  const dispatch = useDispatch();
  const isFormVisible = useSelector((state) => state.editProfileButton);
  const userProfile = useSelector((state) => state.user.profile);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submit");
    dispatch(editProfileButtonActions.toggle());
  }

  return (
    <>
      {isFormVisible ? (
        <>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="edit-profile-form__inputs">
              <input
                type="text"
                placeholder={userProfile.firstName}
                name="firstName"
              />

              <input
                type="text"
                placeholder={userProfile.lastName}
                name="lastName"
              />
            </div>
            <div className="edit-profile-form__buttons">
              <button className="edit-save-button" type="submit">
                Save
              </button>
              <div
                className="edit-cancel-button"
                onClick={() => dispatch(editProfileButtonActions.toggle())}
              >
                Cancel
              </div>
            </div>
          </form>
        </>
      ) : (
        <button
          className="edit-button"
          onClick={() => dispatch(editProfileButtonActions.toggle())}
        >
          Edit Name
        </button>
      )}
    </>
  );
}

export default EditProfileButton;
