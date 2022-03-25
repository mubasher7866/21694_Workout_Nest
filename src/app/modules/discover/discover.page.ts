import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../../services/user/user.service';
import { MouseEvent } from '@agm/core';

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  name?: string;
  id?: string;
  type: string;
  icon?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage {
  currentUser: any;
  markers: marker[];
  selectedSegment: 'Buddies' | 'Gym' = 'Buddies';

  // google maps zoom level
  zoom: number = 10;
  // initial center position for the map
  lat: number = 53.32141625884371;
  lng: number = -6.266629730808342;
  iconUrl: string = 'https://cdn-icons-png.flaticon.com/512/69/69840.png';
  userImg: string = 'https://cdn-icons-png.flaticon.com/512/69/69840.png';

  constructor(
    private userService: UserService,
    public afStore: AngularFirestore
  ) {}

  async ionViewDidEnter() {
    const id = await this.userService.token;
    const user = await this.afStore.collection('users').ref.doc(id).get();
    this.currentUser = user.data();
    const snapshot = await this.afStore.collection('users').ref.get();
    const users = snapshot.docs
      .filter(
        (doc) =>
          doc.data().lat && doc.data().lng && user.data().uid != doc.data().uid
      )
      .map((doc) => ({
        id: doc.id,
        type: 'Buddy',
        lat: doc.data().lat,
        lng: doc.data().lng,
        icon: doc.data().picture_thumbnail
          ? doc.data().picture_thumbnail
          : this.userImg,
        name: doc.data().fname + ' ' + doc.data().lname,
        draggable: false,
      }));
    this.markers = users;
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  async changeSegment(e: any) {
    let value: string = e.detail.value;
    if (value === 'Gym') {
      const gyms = await this.afStore.collection('gyms').ref.get();
      const gymMarkers: marker[] = gyms.docs.map((doc) => ({
        id: doc.id,
        type: 'gym',
        lat: doc.data().lat,
        lng: doc.data().lng,
        name: doc.data().name,
        draggable: false,
      }));
      console.log(gymMarkers);
      this.markers = gymMarkers;
    }
    if (value === 'Buddies') {
      const snapshot = await this.afStore.collection('users').ref.get();
      const users = snapshot.docs
        .filter(
          (doc) =>
            doc.data().lat &&
            doc.data().lng &&
            this.currentUser.uid != doc.data().uid
        )
        .map((doc) => ({
          id: doc.id,
          type: 'Buddy',
          lat: doc.data().lat,
          lng: doc.data().lng,
          icon: doc.data().picture_thumbnail
            ? doc.data().picture_thumbnail
            : this.userImg,
          name: doc.data().fname + ' ' + doc.data().lname,
          draggable: false,
        }));
      this.markers = users;
    }
  }
}
