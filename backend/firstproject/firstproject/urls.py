from django.contrib import admin
from django.urls import path
from firstapp import views

urlpatterns = [

    path('admin/', admin.site.urls),
    path('HomePage/', views.MainPage,name="HomePage"),
    path('ProductPage/', views.ProductPage,name="ProductPage"),
    path('CartPage/', views.CartPage,name="ProductPage"),
    path('LoginPage/',views.LoginPage,name="LoginPage"),
    path('SignUpPage/',views.SignUpPage,name="SignupPage"),

    path('ProductPage/increment-product-count/<str:product_id>/', views.incrementCount, name="increment-product-count"),
    path('ProductPage/decrement-product-count/<str:product_id>/', views.decrementCount, name="decrement-product-count"),
    path('ProductPage/update-product/<str:product_id>/',views.updateProduct,name="update-product"),    
    path('LoginPage/login/',views.LoginUser,name="LoginUser"),     
    path('SignUpPage/signUp/',views.SignUpUser,name="LoginUser"),   
    # path('firstproject/login/',views.loginPage,name="login-register")   

]











# """
# URL configuration for firstproject project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.0/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """


# from django.urls import path
# from firstapp import views

# urlpatterns = [
#     # Other URL patterns...
#     path('ProductPage/', views.ProductPage, name="ProductPage"),
#     path('ProductPage/update-product/<str:product_id>/', views.updateProduct, name="update-product"),
# ]
