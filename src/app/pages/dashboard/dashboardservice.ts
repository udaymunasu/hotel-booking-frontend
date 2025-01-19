import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DummyDataService {
  constructor() {}

  getDummyData() {
    return {
      users: this.generateUsers(),
      sales: this.generateSales(),
      tasks: this.generateTasks(),
      rooms: this.generateRooms(), // Add this line
    };
  }

  private generateUsers() {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      status: index % 2 === 0 ? 'Active' : 'Inactive',
    }));
  }

  private generateSales() {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      product: `Product ${index + 1}`,
      amount: (Math.random() * 100).toFixed(2),
      date: new Date(
        Date.now() - index * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    }));
  }

  private generateTasks() {
    return Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      title: `Task ${index + 1}`,
      assignedTo: `User ${Math.floor(Math.random() * 10) + 1}`,
      dueDate: new Date(
        Date.now() + index * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      completed: Math.random() > 0.5,
    }));
  }

  private generateRooms() {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Room ${index + 1}`,
      description: `Description for Room ${
        index + 1
      }. A beautiful room with all amenities.`,
      price: (Math.random() * 200).toFixed(2),
      image: `https://via.placeholder.com/300x150?text=Room+${index + 1}`,
    }));
  }

  getDummyRooms() {
    return this.generateRooms();
  }

  getTopDestinations(): Observable<any[]> {
    const destinations: any[] = [
      {
        name: 'Charminar',
        imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.wodFHZqy4cPbY7BOgqkckgHaFj&pid=Api&P=0&h=180',
        description: 'The iconic 16th-century mosque with impressive architecture.'
      },
      {
        name: 'Golconda Fort',
        imageUrl: 'https://assets-news.housing.com/news/wp-content/uploads/2020/11/02184143/Everything-you-need-to-know-about-Golconda-Fort-FB-1200x700-compressed.jpg',
        description: 'A massive fortress with a rich history and stunning views.'
      },
      {
        name: 'Hussain Sagar Lake',
        imageUrl: 'https://4.bp.blogspot.com/_sGiZ6JyoTcI/S-4VpbFCx2I/AAAAAAAABzs/bu3YyVIGrHs/s1600/hussain-sagar-lake-night.jpg',
        description: 'A picturesque lake with a famous Buddha statue.'
      },
      {
        name: 'Ramoji Film City',
        imageUrl: 'https://temples.vibhaga.com/wp-content/uploads/2020/07/ramoji-film-city-hyderabad-entryfee-timings-tour-package-header.jpg',
        description: 'The world’s largest integrated film studio complex.'
      },
      {
        name: 'Birla Mandir',
        imageUrl: 'https://static.toiimg.com/thumb/msid-39669197,width=1200,height=900/39669197.jpg',
        description: 'A beautiful white marble temple overlooking the city.'
      },
      {
        name: 'Chowmahalla Palace',
        imageUrl: 'https://3.bp.blogspot.com/-KDfrjv5pAR0/WGi3UMONPyI/AAAAAAAAJCA/k7Asko5pC-MBdHRJlZJ5QOtSNZXKGEF4gCLcB/s1600/11.jpg',
        description: 'A stunning palace complex with rich heritage and architecture.'
      }
    ];

    return of(destinations);  // Return the static data as an Observable
  }
}
