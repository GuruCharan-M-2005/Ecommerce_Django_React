from django.contrib import admin
from .models import Room,Topic,Messege

# To register new room in admin table
# Visit 8000/admin/auth/ to seee your admin database
admin.site.register(Room)
admin.site.register(Topic)
admin.site.register(Messege)
