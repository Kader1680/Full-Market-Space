# Backend Section
 
## Tools used in this project
- Laravel 
- PHP 
- Mysql 

# Project Structure
backend/
   - app/
   - database/
   - route/
   - storage/
   - tests/
   - routes/
   - public/

# Define Database Schema Entity
- Users 
- Products 
- Categories 
- Carts 
- Orders
- Orderitems
- Payments


# Api Design Endpoints
### User / Customer use System
---------------  Users Endpoint -------------
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/profile` | Access the profile | Yes |
| `POST` | `/api/v1/register` | Create a new account | No |
| `POST` | `/api/v1/login` | Access the account | No |


---------------  Products Endpoint -------------
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/prodcuts` | Retrieve all users | No |
| `GET` | `/api/v1/prodcut/:id` | Retrieve all users | No |


---------------  Categories Endpoint -------------
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/Category` | Retrieve all categories | No |

---------------  Carts Endpoint -------------
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/carts` | Get all Items inside | Yes |

---------------  Orders Endpoint -------------
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/order/create` | Get all Items inside | Yes |
| `GET` | `/api/v1/Orders/` | Get all orders | Yes |
| `GET` | `/api/v1/Orders/:id` | Get single order | Yes |

---------------  Payments Endpoint -------------
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/Payment` | Place payment | Yes |
| `GET` | `/api/v1/Payments-history` | Get all Payment History | Yes |



### Admin owner for System

---------------  Products Endpoint -------------
| Method | Endpoint | Description | Auth & Authoraziation Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/admin/prodcuts/create` | Create new product | Yes |
| `GET` | `/api/v1/admin/prodcuts` | Retrieve all products | Yes |
| `GET` | `/api/v1/admin/prodcut/:id` | Retrieve single product | Yes |
| `DELETE` | `/api/v1/admin/prodcuts/:id` | Delete a specific prodcut | Yes |
| `PUT` | `/api/v1/admin/prodcuts/:id` | Update a product | Yes |

---------------  Categories Endpoint -------------
| Method | Endpoint | Description | Auth & Authoraziation Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/admin/categories/create` | Create new category | Yes |
| `GET` | `/api/v1/admin/categories` | Retrieve all categories | Yes |
| `GET` | `/api/v1/admin/categories/:id` | Retrieve single category | Yes |
| `DELETE` | `/api/v1/admin/categories/:id` | Delete a specific category | Yes |
| `PUT` | `/api/v1/admin/categories/:id` | Update a category | Yes |

---------------  Orders Endpoint -------------
| Method | Endpoint | Description | Auth & Authoraziation Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/admin/orders` | Retrieve all orders | Yes |
| `GET` | `/api/v1/admin/orders/:id` | Retrieve single order | Yes |

---------------  Users Endpoint -------------
| Method | Endpoint | Description | Auth & Authoraziation Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/admin/users` | Retrieve all users | Yes |

---------------  Payments Endpoint -------------
| Method | Endpoint | Description | Auth & Authoraziation Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/admin/payments` | Retrieve all Payments Records | Yes |

# Access the director of the backend 
```bash
cd backend
```
# install package of the project 
```bash
composer install
```
# create env file 
```bash
cp .env.example .env
```

# Set var enviorement 
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=your_usename
DB_PASSWORD=your_paswprd

APP_NAME=TrendySpace
APP_URL=http://localhost
```


# Run the migrations  
```bash
php artisan migrate
```
# Link the Storage  
```bash
php artisan storage:link
```
# Generate key  
```bash
php artisan key:generate
```
# Start the Server locally  
```bash
php artisan serve
```
