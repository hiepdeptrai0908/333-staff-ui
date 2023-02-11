Link trang web: **<a href="https://333staff.vercel.app" target="_blank">https://333staff.vercel.app</a>**

### Mô tả dự án

Dự án này dựa trên ý tưởng là làm ra 1 ứng ụng để có thể quản lý thời gian làm việc của mọi người trong quán (Quán ăn của một người chị ở gần ga 小伝馬町) thay thế cho excel, vì thấy chị ấy phải nhập từng giờ ra vào khá là vất vả, nên mình đã viết ra ứng dụng này để giúp chị, cũng tiện thể thực hành ôn tập lại kiến thức.

### Giới thiệu công nghệ sử dụng

**1. Frontend**

-   [x] **Reactjs**
-   [x] Deploy: **Vercel**

**2. Backend**

-   [x] **Spring Boot**
-   [x] DB: **PostgreSQL**
-   [x] Deploy: **Heroku**
-   Github backend: https://github.com/hiepdeptrai0908/333-staff-api

-   Phía back end sẽ tính toán thời gian và lưu vào database/gửi về cho front end bằng api (file JSON)

### Giới thiệu sơ lược về một số chức năng trên trang web

**1.Trang Home**

-   Tại trang Home nhập mã số nhân viên để có thể bấm thời gian (vào ca, ra ca, bắt đầu giải lao, kết thúc giải lao)
    Ở đây để test thì mình sẽ cung cấp tài khoản của admin cho mọi người để lấy quyền của admin tạo tài khoản mới, rồi dùng tài khoản vừa tạo để test:

          * Lưu ý:
          - Chỉ test thời gian ra vào thôi thì dùng mã nhân viên của admin cũng ok.
          - Những Data sẵn có từ đầu thì mọi người không được sửa xoá.
          - Nếu Data do mọi người tạo ra test thì sửa xoá thoải mái.

    -   Tài khoản: **admin**
    -   Mật khẩu: **admin**
    -   Mã nhân viên: **333**

    ![Ảnh nhập mã nhân viên](https://github.com/hiepdeptrai0908/images/blob/main/image1.png?raw=true)

-   Bấm vào logo có để lựa chọn phông nền (background)
-   Thời gian được phía backend làm tròn 0, 15, 30, 45 phút
-   Được giải lao tối đa 2 lần
-   Để vào phần quản lý thì bấm nút **管理**

**2.Trang Quản lý (管理)**

-   Tạo tài khoản mới để test: vào mục `Tạo tài khoản` sau đó đăng nhập tài khoản của admin đã cung cấp ở trên hoặc của một nhân viên đã có sẵn.
    ![Ảnh trang quản lý](https://github.com/hiepdeptrai0908/images/blob/main/image2.png?raw=true)

-   Ở phần **Quản lý nhân viên**: Cần xem chi tiết thời gian làm của từng cá nhân hoặc thông tin thì cần đăng nhập tài khoản admin hoặc tài khoản của chính người đó.
    ![Ảnh trang quản lý](https://github.com/hiepdeptrai0908/images/blob/main/image4.png?raw=true)

-   Ở phần **Quản lý thời gian**: Để vào được **Edit** thì chỉ có tài khoản admin mới có quyền được sửa.

    > \*_nếu thời gian mọi người tạo ra để test thì Sửa Xoá thoải mái_

    ![Ảnh trang quản lý](https://github.com/hiepdeptrai0908/images/blob/main/image3.png?raw=true)
