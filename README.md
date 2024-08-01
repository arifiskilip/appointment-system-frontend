# Hastane Randevu Sistemi

Bu proje, kullanıcıların (hastalar, doktorlar ve yöneticiler) hastane randevularını yönetmelerini sağlayan bir sistemdir. Sistem, kullanıcı kayıt ve giriş işlemleri, profil yönetimi, randevu alma ve yönetimi gibi birçok özelliği içermektedir.

## İçindekiler

- [Bilgi](#bilgi)
- [Proje Tanımı](#proje-tanımı)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Prensipler ve Yaklaşımlar](#prensipler-ve-yaklaşımlar)
- [Başlangıç](#başlangıç)
  - [Gereksinimler](#gereksinimler)
  - [Kurulum](#kurulum)
    - [Frontend için](#frontend-için)
    - [Backend için](#backend-için)
  - [Çalıştırma](#çalıştırma)
    - [Frontend Başlatma](#frontend-başlatma)
    - [Backend Başlatma](#backend-başlatma)
- [Kullanım](#kullanım)
  - [Kullanıcı Kayıt ve Giriş Sistemi](#kullanıcı-kayıt-ve-giriş-sistemi)
  - [Profil Yönetimi](#profil-yönetimi)
  - [Randevu Sistemi](#randevu-sistemi)
  - [Randevu Yönetimi](#randevu-yönetimi)
  - [Doktor Takvimi](#doktor-takvimi)
  - [Hasta Raporları ve Geçmiş Randevular](#hasta-raporları-ve-geçmiş-randevular)
  - [Bildirim Sistemi](#bildirim-sistemi)
  - [Admin Paneli](#admin-paneli)
  - [Raporlama ve Analiz](#raporlama-ve-analiz)
  - [Güvenlik](#güvenlik)
  - [Yetkilendirme ve Rol Yönetimi](#yetkilendirme-ve-rol-yönetimi)
  - [Destek ve Yardım Bölümü](#destek-ve-yardım-bölümü)
  - [Kullanıcı Geri Bildirimi](#kullanıcı-geri-bildirimi)
- [Geliştirme Aşamasında Neler Var?](#geliştirme-aşamasında-neler-var)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Screenshots](#screenshots)
- [Lisans](#lisans)

## Bilgi

### Angular CLI Bilgileri

Bu proje, Angular CLI kullanılarak oluşturulmuştur. Angular CLI kullanımı ile ilgili bazı temel bilgileri aşağıda bulabilirsiniz.

#### Development server

Geliştirme sunucusunu çalıştırmak için `ng serve` komutunu kullanın. `http://localhost:4200/` adresine gidin. Uygulama, kaynak dosyalarında yaptığınız değişikliklerle otomatik olarak yeniden yüklenecektir.

#### Code scaffolding

Yeni bir bileşen oluşturmak için `ng generate component component-name` komutunu kullanın. Ayrıca `ng generate directive|pipe|service|class|guard|interface|enum|module` komutlarını da kullanabilirsiniz.

#### Build

Projeyi derlemek için `ng build` komutunu kullanın. Derleme çıktıları `dist/` dizininde saklanacaktır.

#### Running unit tests

Birim testlerini çalıştırmak için `ng test` komutunu kullanın. Bu testler [Karma](https://karma-runner.github.io) üzerinden yürütülecektir.

#### Running end-to-end tests

Uçtan uca testleri çalıştırmak için `ng e2e` komutunu kullanın. Bu komutu kullanmak için, önce uçtan uca test yeteneklerini sağlayan bir paketi eklemeniz gerekmektedir.

#### Further help

Angular CLI hakkında daha fazla yardım almak için `ng help` komutunu kullanın veya [Angular CLI Genel Bakış ve Komut Referansı](https://angular.io/cli) sayfasına göz atın.

## Proje Tanımı

Hastane Randevu Sistemi, hastaların, doktorların ve yöneticilerin randevu işlemlerini kolaylaştırmak amacıyla geliştirilmiştir. Kullanıcılar sisteme kayıt olup giriş yapabilir, profillerini yönetebilir, doktorların uygunluk durumuna göre randevu alabilir ve yönetebilirler. Doktorlar kendi çalışma takvimlerini belirleyebilir ve randevularını yönetebilir. Yöneticiler ise sistemdeki tüm kullanıcıları ve randevuları yönetebilir, sistemin kullanım istatistiklerini görüntüleyebilir.

## Kullanılan Teknolojiler

### Backend
- ASP.NET Core 8
- C#
- Fluent Validation
- Entity Framework Core
- AutoMapper
- Newtonsoft.Json
- Mediatr
- Json Web Token
- Web API
- Swagger
- MsSQL
- MailKit - MimeKit

### Frontend
- Angular 17
- Typescript
- Bootstrap
- SweetAlert
- Toastr
- ngx-spinner
- RxJS
- auth0/angular-jwt
- FullCalendar
- ChartJS
- jQuery

### Prensipler ve Yaklaşımlar
- Clean Architecture
- Code First
- CQRS
- OOP
- SOLID
- AOP
- IoC
- Fluent API

## Başlangıç

### Gereksinimler

Projenizi yerel ortamda çalıştırmak için aşağıdaki yazılımlara ihtiyacınız olacak:
- Node.js
- .NET SDK
- Visual Studio veya Visual Studio Code (Backend için)

### Kurulum

#### Frontend için
1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/arifiskilip/appointment-system-frontend.git

2. Proje Dizini İçine Girin:
   ```bash
   cd AppointmentSystemFrontend

3. Bağımlılıkları yükleyin:
   ```bash
   npm install

4. Geliştirme Sunucusunu Başlatın:
   ```bash
   ng serve

5. Tarayıcıda Açın: Tarayıcınızda 'http://localhost:4200/' adresine gidin.

#### Backend için
1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/arifiskilip/Pair6_AppointmentSystem.git

2. Visual Studio'yu açın ve 'Open Project/Solution' ile projeyi açın.
3. 'Solution Explorer' penceresinde 'WebAPI' projesini sağ tıklayın ve 'Set as Startup Project' seçeneğini belirleyin.
4. Visual Studio'da 'Package Manager Console' penceresini açın.
5. 'Persistence' projesini seçin ve aşağıdaki komutu çalıştırarak veritabanı güncellemelerini gerçekleştirin:
6. ```bash
   update-database
7. 'Start' düğmesine basarak uygulamanızı başlatın ve çalıştığından emin olun.

### Çalıştırma

#### Frontend'i Başlatma
1. Terminali açın ve proje klasörüne gidin:
   ```bash
   cd path/to/AppointmentSystemFrontend

2. Bağımlılıkları yükleyin:
   ```bash
   npm install

3. Frontend'i başlatmak için:
   ```bash
   ng serve

#### Backend'i Başlatma
1. 'Start' düğmesine basarak uygulamanızı başlatın ve çalıştığından emin olun.

## Kullanım

### Kullanıcı Kayıt ve Giriş Sistemi

Kullanıcılar (hastalar, doktorlar ve yöneticiler) sisteme kayıt olabilir ve giriş yapabilir. Kullanıcı kayıt sırasında ad, soyad, e-posta, telefon numarası ve şifre bilgileri girilir. Giriş için kullanıcı adı (e-posta) ve şifre kullanılır.

### Profil Yönetimi

Kullanıcılar kendi profil bilgilerini görüntüleyebilir ve günceller.. Kullanıcılar kişisel bilgilerini (adres, telefon numarası vb.) günceller. Şifre değiştirme özelliği vardır.

### Randevu Sistemi

Hastalar, doktorların uygunluk durumuna göre randevu alabilir. Randevu tarih ve saat seçimi yapabilir. Randevu alındıktan sonra, kullanıcılara e-posta ile bilgilendirme yapılır.

### Randevu Yönetimi

Hastalar randevu alabilir ve mevcut randevularını görüntüleyebilir. Hastalar randevularını iptal edebilir. Doktorlar kendi randevu takvimlerini görüntüleyebilir. Yöneticiler sistemdeki tüm randevuları görüntüleyebilir ve yönetebilir.

### Doktor Takvimi

Doktorlar kendi çalışma takvimlerini belirleyebilir. Doktorlar mevcut randevuları ve boş saat dilimlerini görebilir.

### Hasta Raporları ve Geçmiş Randevular

Hastalar, geçmiş randevularını ve doktor raporlarını görüntüleyebilir. Doktorlar, hastaların geçmiş randevu bilgilerine ve raporlarına erişebilir.

### Bildirim Sistemi

Hastalara ve doktorlara yaklaşan randevuları hakkında bildirim gönderilir. Bildirimler e-posta yoluyla yapılır.

### Admin Paneli

Yöneticiler, sistemdeki tüm kullanıcıları ve randevuları yönetebilir. Yöneticiler kullanıcıların bilgilerini düzenleyebilir.

### Raporlama ve Analiz

Yöneticiler, sistemin kullanım istatistiklerini ve raporlarını görüntüleyebilir. Randevu sayısı, kullanıcı sayısı gibi metrikler raporlanabilir.

### Güvenlik

Kullanıcı bilgileri ve iletişim bilgileri şifrelenmiş bir şekilde saklanır. (Encryption)

### Yetkilendirme ve Rol Yönetimi

Sistem farklı kullanıcı rolleri (hasta, doktor, yönetici) için yetkilendirme mekanizması içerir. Her rolün erişim hakları tanımlıdır.

### Destek ve Yardım Bölümü

Kullanıcılar sistemle ilgili yardım ve destek alabilecekleri bir bölüm bulunur. Sıkça Sorulan Sorular (SSS) bölümü.

### Kullanıcı Geri Bildirimi

Kullanıcılar sistemle ilgili geri bildirim ve önerilerde bulunabilir. Geri bildirimler yöneticiler tarafından görüntülenir.

## Geliştirme Aşamasında Neler Var?

- Yeni özellikler ve iyileştirmeler
- Daha kapsamlı dokümantasyon
- Daha fazla güvenlik önlemi eklenmesi
- Mobil uygulama geliştirilmesi
- Daha detaylı raporlama ve analiz araçları vb.

## Katkıda Bulunma

Katkıda bulunmak istiyorsanız, lütfen bir pull request açmadan önce bir issue açarak neyi değiştirmek veya eklemek istediğinizi tartışın. Her türlü geri bildiriminiz için teşekkür ederiz! Projeye katkıda bulunmak isterseniz aşağıdaki adımları izleyebilirsiniz:

1. Bu projeyi forklayın.
2. Forkladığınız projeyi klonlayın:
   ```bash
   git clone https://github.com/kullanıcı-adı/hastane-randevu-sistemi.git

3. Yeni bir dal (branch) oluşturun:
   ```bash
   git checkout -b özellik-isim

4. Yaptığınız değişiklikleri commitleyin:
   ```bash
   git commit -m 'Yeni özellik ekleme'

5. Değişiklikleri dalınıza push edin:
   ```bash
   git push origin özellik-isim

6. Bir pull request açın.

## Screenshots
### Home Page
![img1](https://github.com/user-attachments/assets/7eae38c0-e336-4fd1-957f-8972bcb0f3eb)
![Ekran Alıntısı](https://github.com/user-attachments/assets/fe98066d-a7b9-454d-94a6-020a52b5b34b)
### Login - Register Page
![login](https://github.com/user-attachments/assets/82ca9b83-7f95-4c54-bcfa-ddac0f834e59)
![register](https://github.com/user-attachments/assets/fb0651e4-442d-4ff7-96fd-10060a0a7e4d)
![forgot_password](https://github.com/user-attachments/assets/9e61f40a-5230-431a-ad69-17291143af10)
![forgot_password2](https://github.com/user-attachments/assets/4bbd648d-504d-4477-9d7c-33b68cc7b1b5)
![forgot_password3](https://github.com/user-attachments/assets/cb4bde0b-e060-488b-a42d-8b089060afed)
![verificationcode](https://github.com/user-attachments/assets/78586cf3-a9e8-46ac-9c5b-f0370489a180)
![sendverificationcode](https://github.com/user-attachments/assets/358a37e0-2383-4a96-ab35-ffa5d1da9b5f)
### Patient Page
![patientpage](https://github.com/user-attachments/assets/ccb95cd5-3078-477b-92f8-27bc298af8bb)
![appointmentsearch](https://github.com/user-attachments/assets/d2a88963-20fa-4958-baf5-a6610d0be3c1)
![appointmetnsearch_doctors](https://github.com/user-attachments/assets/b09df452-ec40-4a8d-a41d-c6732840f885)
![appointmetnsearch_doctors2](https://github.com/user-attachments/assets/817b1bd1-9f5c-49b1-b05d-a79e44ee1b39)
![appointmetnsearch_doctors3](https://github.com/user-attachments/assets/a1c6d807-316c-481e-ae4c-bb2c2b37d8fd)
![my_appointments](https://github.com/user-attachments/assets/6e3290d0-a1eb-4d2a-8d7d-48105e331b9b)
![appointment_feedback](https://github.com/user-attachments/assets/d31edf75-9f71-4856-baaf-da711b2594d7)
![patient_report](https://github.com/user-attachments/assets/ebd6e770-d2ba-4dc6-b823-8446e670f2da)
![report_detail](https://github.com/user-attachments/assets/6df0be3e-39d6-4e53-987b-01a09da08601)
![patient_profile](https://github.com/user-attachments/assets/9912a78d-f115-4f73-8b34-c514184a16ad)
![patient_profile2](https://github.com/user-attachments/assets/bd84c9a4-d934-4fa6-9014-37be580970d6)
![patient_profile3](https://github.com/user-attachments/assets/66cf1315-a0b0-4abc-beb2-7627a47d8d08)
![patient_profile4](https://github.com/user-attachments/assets/56ba7af3-15f6-4b7d-b8b2-5758f893a345)
### Doctor Page
![doctor_page](https://github.com/user-attachments/assets/b499723b-694a-4a97-8849-57bd39ca8c3d)
![doctor_appointment](https://github.com/user-attachments/assets/46e17e44-b926-42dd-b3aa-5c94f141c3d6)
![doctor_appointment2](https://github.com/user-attachments/assets/87dcaa6a-7f39-4d88-ad99-8235a9b84bf4)
![doctor_appointment report_page](https://github.com/user-attachments/assets/69ddc94c-fc63-4a14-8da3-dd30d2ef295d)
![doctor_patients](https://github.com/user-attachments/assets/b4e23c6c-94a9-475c-a150-e535536058d2)
![patient_appointments](https://github.com/user-attachments/assets/04b50bc2-e5f4-4f1d-9058-ad6d1c480d6b)
![doctor_schedule](https://github.com/user-attachments/assets/cb21f18a-007a-4106-a2f0-d0e05933aedd)
![doctor_schedule_add](https://github.com/user-attachments/assets/624f62a7-71bb-4104-9f9c-0c7428e4084f)
### Admin Page
![admin_page](https://github.com/user-attachments/assets/3d0febed-95d0-48ea-85ea-2e6735b7404f)
![doctor_branches](https://github.com/user-attachments/assets/5505b50c-1ef1-4aca-afd3-03f819f62f41)
![admin_titles](https://github.com/user-attachments/assets/f814478d-1224-48ec-ad02-45a45f3a9b58)
![admin_patients](https://github.com/user-attachments/assets/ca1b2e3c-1892-46c3-8a57-a9636fdc5eec)
![admin_patient_detail](https://github.com/user-attachments/assets/0d87010a-f422-4f67-a532-1c3db1e92a75)
![admin_patient_detail2](https://github.com/user-attachments/assets/925155a9-b824-488a-983f-9df205fb672e)
![admin_patient_detail3](https://github.com/user-attachments/assets/1391982c-2313-449c-9169-bc48745596f1)
![admin_doctos](https://github.com/user-attachments/assets/891d10b9-937c-47ef-946d-6a210c198fc9)
![admin_feedback](https://github.com/user-attachments/assets/6c784158-a269-4da1-b9fa-874d52d74d9d)
![admin_feedback_detail](https://github.com/user-attachments/assets/1938de8b-b82f-43fe-a1d1-1905e4804f90)


## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Daha fazla bilgi için LICENSE dosyasına bakın.
