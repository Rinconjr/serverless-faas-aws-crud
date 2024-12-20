
# Serverless FaaS AWS CRUD

Este repositorio contiene un CRUD básico que utiliza la arquitectura Serverless y FaaS (Function as a Service) para ofrecer una solución eficiente y escalable. 
Se apoya en AWS Lambda para implementar las funciones del CRUD y DynamoDB como base de datos.

---

## Características del Proyecto

- CRUD completo (Crear, Leer, Actualizar, Eliminar) para usuarios.
- Implementación basada en AWS Lambda y DynamoDB.
- Configuración mediante Serverless Framework.
- Endpoint Gateway API para consumir las funciones.

---

## Pre-requisitos

- Node.js instalado en el sistema.
- Python instalado en el sistema.
- AWS CLI configurado con credenciales válidas.
- Instalación del Serverless Framework:
  ```bash
  npm install -g serverless
  ```

---

## Despliegue de la Aplicación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/<tu-usuario>/serverless-faas-aws-crud.git
   cd serverless-faas-aws-crud
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

   ```bash
   pip install boto3
   ```

3. Despliega el servicio en AWS:
   ```bash
   serverless deploy
   ```

4. Al finalizar el despliegue, verás los endpoints generados. Ejemplo:
   ```
   Deploying "crud-users" to stage "dev" (us-east-1)

   ✔ Service deployed to stack crud-users-dev (100s)
   /dev/users/all
     POST - https://<id>.execute-api.us-east-1.amazonaws.com/dev/users
     GET - https://<id>.execute-api.us-east-1.amazonaws.com/dev/users/{id}
     PATCH - https://<id>.execute-api.us-east-1.amazonaws.com/dev/users/{id}
     DELETE - https://<id>.execute-api.us-east-1.amazonaws.com/dev/users/{id}
   functions:
     get-users: crud-users-dev-get-users (188 kB)
     get-all-users: crud-users-dev-get-all-users (188 kB)
     create-users: crud-users-dev-create-users (188 kB)
     update-users: crud-users-dev-update-users (189 kB)
     delete-users: crud-users-dev-delete-users (189 kB)
   ```

---

## Uso en Desarrollo

Para correr la aplicación en un entorno local, utiliza el siguiente comando:
```bash
serverless offline start
```

Esto iniciará un servidor local en el puerto configurado (por defecto 3000), donde puedes consumir los endpoints como si estuvieran en AWS.

---

## Endpoints

| Método | Endpoint                                                  | Descripción                  |
|--------|-----------------------------------------------------------|------------------------------|
| POST   | `/dev/users`                                              | Crear un nuevo usuario       |
| GET    | `/dev/users/{id}`                                         | Obtener un usuario por ID    |
| GET    | `/dev/users/all`                                          | Obtener todos los usuarios   |
| PATCH  | `/dev/users/{id}`                                         | Actualizar un usuario por ID |
| DELETE | `/dev/users/{id}`                                         | Eliminar un usuario por ID   |

---

## Recursos Utilizados

- **AWS Lambda**: Funciones como servicio.
- **API Gateway**: Gestión de las APIs.
- **DynamoDB**: Almacenamiento de datos.
- **Serverless Framework**: Simplificación del despliegue.
