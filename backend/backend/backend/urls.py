from django.contrib import admin
from django.urls import path
from myapp import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('food/', views.FoodPage,name="FoodPage"),
    path('food/filter/<str:type>/', views.FilterPage,name="FoodPage"),
    path('food/increment/<int:product_id>/', views.incrementCount, name="increment-product-count"),
    path('food/decrement/<int:product_id>/', views.decrementCount, name="decrement-product-count"),
    path('food/update/<int:product_id>/',views.updateFood,name="update-product"),    
    path('food/remove/<int:product_id>/',views.removeFood,name="remove-product"),    
    path('food/checkout/',views.checkOut,name="check-out"),    
    path('LoginPage/login/',views.LoginUser,name="LoginUser"),     
    path('SignUpPage/signUp/',views.SignUpUser,name="LoginUser"),   

]
