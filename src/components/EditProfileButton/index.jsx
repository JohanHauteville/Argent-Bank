import { useSelector, useDispatch } from "react-redux";
import * as editProfileButtonActions from "../../features/editButton";
import * as userActions from "../../features/user";
import { editUserProfile } from "../../features/user-actions";

import "./styles.scss";

function EditProfileButton() {
  const dispatch = useDispatch();
  const isFormVisible = useSelector((state) => state.editProfileButton);
  const userProfile = useSelector((state) => state.user.profile);
  const token = useSelector((state) => state.user.token);
  const notification = useSelector((state) => state.user.status);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProfileValues = Object.fromEntries(formData);

    // Vérification des données
    if (
      checkString(newProfileValues.firstName) &&
      checkString(newProfileValues.lastName)
    ) {
      console.log("Tout est OK");
      dispatch(
        userActions.updateStatus({ message: "", class: "notification" })
      );
      dispatch(editUserProfile(token, newProfileValues));
      dispatch(editProfileButtonActions.toggle());
    } else {
      console.log("erreur");
      dispatch(
        userActions.updateStatus({
          message: "Incorrect data",
          class: "notification--error",
        })
      );
    }
  }

  return (
    <>
      {isFormVisible ? (
        <>
          {notification.message !== "" && (
            <p className={notification.class}>{notification.message}</p>
          )}
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="edit-profile-form__inputs">
              <input
                type="text"
                placeholder={userProfile.firstName}
                name="firstName"
                required
              />

              <input
                type="text"
                placeholder={userProfile.lastName}
                name="lastName"
                required
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

// Fonction de vérification
function checkString(string) {
  const regex = new RegExp(/^[a-zA-Z-]+$/);
  return regex.test(string);
}
