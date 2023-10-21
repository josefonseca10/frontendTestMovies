<template>
  <div class="container mt-4">
    <h2 class="mb-4">List Movies</h2>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Add Movie
    </button>
    <div class="my-3"></div>
    <div class="container">
      <div class="row">
        <div class="d-flex flex-wrap">
          <div class="mb-3" v-for="movie in movieList" :key="movie.id">
          </div>
          <div class="card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 col-12" v-for="movie in movieList" :key="movie.id">
            <img :src="movie.image" class="card-img-top img-fluid fixed-image" alt="...">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ movie.name }}</h5>
              <p class="card-text">{{ movie.description }}</p>
              <div class="star-rating-adjust">
                <star-rating
                    :rating ="movie.average"
                    :star-size="30"
                    :read-only="true"
                ></star-rating>
              </div>
              <div class="my-2"></div>
              <div class="mt-auto align-self-center"> <!-- Utilizamos align-self-start para alinear el botón en la parte superior -->
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalComment" @click="commentMovie(movie)">Comment Movie</button>
              </div>
              <div class="my-1"></div>
              <div class="mt-auto align-self-center"> <!-- Utilizamos align-self-start para alinear el botón en la parte superior -->
                <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" @click="editMovie(movie)">Edit Movie</button>
              </div>
              <div class="my-1"></div>
              <div class="mt-auto align-self-center"> <!-- Utilizamos align-self-start para alinear el botón en la parte superior -->
                <button class="btn btn-danger" @click="deleteMovie(movie.id)">Delete Movie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for add movie -->
  <div class="modal fade" id="exampleModal" ref="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add Movie</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addMovie()">
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" v-model="formAddMovie.name">
              <div class="error" v-if="errors.name">
                {{errors.name}}
              </div>
            </div>
            <div class="form-group">
              <label>Synopsis</label>
              <input type="text" class="form-control" v-model="formAddMovie.description">
              <div class="error" v-if="errors.description">
                {{errors.description}}
              </div>
            </div>
            <div class="form-group">
              <label>Image</label>
              <div class="input-group">
                <input type="file" class="form-control" id="image" @change="handleFileChange"  aria-label="Upload">
              </div>
              <div class="error" v-if="errors.image">
                {{errors.image}}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal()">Close</button>
              <button type="submit" class="btn btn-primary">Save Movie</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for edit movie -->
  <div class="modal fade" id="exampleModalEdit" ref="exampleModalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Movie</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveMovie()">
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" v-model="formEditMovie.name">
              <div class="error" v-if="errors.name">
                {{errors.name}}
              </div>
            </div>
            <div class="form-group">
              <label>Synopsis</label>
              <input type="text" class="form-control" v-model="formEditMovie.description">
              <div class="error" v-if="errors.description">
                {{errors.description}}
              </div>
            </div>
            <div class="form-group">
              <label>Image</label>
              <div class="input-group">
                <input type="file" class="form-control" id="imageEdit" @change="handleFileChangeLoad"  aria-label="Upload">
              </div>
              <div class="error" v-if="errors.image">
                {{errors.image}}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal()">Close</button>
              <button type="submit" class="btn btn-primary">Save Movie</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for add comment for movie -->
  <div class="modal fade" id="exampleModalComment" ref="exampleModalComment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Comment Movie</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createComment()">
            <div class="form-group">
              <label>Comment</label>
              <textarea type="text" class="form-control" v-model="formAddComment.comment"></textarea>
              <div class="error" v-if="errors.comment">
                {{errors.comment}}
              </div>
            </div>
            <div class="form-group">
              <label>Qualification</label>
              <star-rating v-model:rating="formAddComment.qualification"></star-rating>
              <div class="error" v-if="errors.qualification">
                {{errors.qualification}}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal()">Close</button>
              <button type="submit" class="btn btn-primary">Save Comment</button>
            </div>
          </form>
        </div>
        <div class="container">
          <h1>List Comments</h1>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>Comment</th>
                <th>Qualification</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(comment, index) in commentList" :key="index">
                <td>{{ comment.comment }}</td>
                <td>{{ comment.qualification }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="container mt-4">
            <ul class="pagination">
              <li v-for="page in currentPage"
                  v-bind:key="page"
                  v-bind:class="{active: page === currentPage}">
                <a href="#!" @click="nextPage(page)">{{page}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fixed-image {
  width: 200px; /* El ancho que desees */
  height: 200px; /* El alto que desees */
  object-fit: cover; /* Para asegurarte de que la imagen llene el espacio sin distorsión */
}

.star-rating-adjust {
  /* Estilos personalizados para el contenedor del componente vue-star-rating */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Ajustar el tamaño de las estrellas */
.star-rating-adjust .star-rating-star {
  font-size: 20px;
}
</style>
<script>

import StarRating from "vue-star-rating";
import {mapActions} from "vuex";
import {ADD_COMMENT, ADD_MOVIE, GET_COMMENTS, GET_MOVIES, REMOVE_MOVIE, SAVE_MOVIE} from "@/store/storeConstants";
import {useNotification} from "@kyvg/vue3-notification";
import MovieValidations from "@/services/movieValidations";
import CommentValidations from "@/services/commentValidations";
const notification = useNotification()

export default {
  name: "MoviesComponent",
  components: {
    StarRating
  },
  data() {
    return {
      currentPage: 1,
      commentsPerPage: 10, // Número de películas por página
      show: false,
      movieList: [],
      commentList: [],
      errors: [],
      formAddMovie: {
        name: '',
        description: '',
        image: null,
      },
      formEditMovie: {
        name: '',
        description: '',
        image: null,
      },
      formAddComment: {
        idMovie: '',
        qualification: 0,
        comment: '',
      },
    }
  },
  created() {
    this.loadMovies(1, 10)
  },
  computed: {
    pageCount() {
      return Math.ceil(this.commentList.length / this.commentsPerPage);
    },
  },
  methods: {
    ...mapActions('movies', {
      listMovies: GET_MOVIES,
      addMovies: ADD_MOVIE,
      updateMovie: SAVE_MOVIE,
      removeMovies: REMOVE_MOVIE,
    }),
    ...mapActions('comments', {
      addComments: ADD_COMMENT,
      listComments: GET_COMMENTS
    }),
    async nextPage(page) {
      page = page || this.currentPage;
      console.log('pageCountAA', this.pageCount)
      await this.loadComments(page, this.commentsPerPage, this.formAddComment.idMovie)
      console.log('sksk', page)
    },
    closeModal() {
      window.location.reload();
    },
    cleanForm() {
      this.errors = [],
      this.formAddMovie = {
        name: '',
        description: '',
        image: null,
      },
      this.formEditMovie = {
        name: '',
        description: '',
        image: null,
      },
      this.formCommentMovie = {
        idMovie: '',
        qualification: '',
        comment: '',
      }
    },
    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const base64Data = event.target.result;
          resolve(base64Data);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    },
    async handleFileChange(event) {
      this.formAddMovie.image = await this.convertFileToBase64(event.target.files[0]); // Almacenar el archivo seleccionado en formData
    },
    async handleFileChangeLoad(event) {
      if (!event.target.files[0]) {
        return
      }
      this.formEditMovie.image = await this.convertFileToBase64(event.target.files[0]); // Almacenar el archivo seleccionado en formData
    },
    async loadMovies(page, limit) {
      try {
        const response = await this.listMovies({page, limit})
        if (response.status === 200) {
          this.movieList = response.data.data.rows;
        }
      } catch (e) {
        notification.notify({
          title: "Error ☠️",
          duration: 5000,
          text: `${e.message}`,
          type: 'error',
          speed: 1000
        });
      }
    },
    async addMovie() {
      let validations = new MovieValidations(
          this.formAddMovie.name,
          this.formAddMovie.description,
          this.formAddMovie.image
      )
      this.errors = validations.checkValidations();
      if ('name' in this.errors || 'description' in this.errors || 'image' in this.errors) {
        return false
      }
      try {
        const response = await this.addMovies({
          name: this.formAddMovie.name,
          description: this.formAddMovie.description,
          image: this.formAddMovie.image
        })
        if (response.status === 200) {
          notification.notify({
            title: "Movie register 🎉",
            duration: 5000,
            text: `Movie ${response.data.data.name} register success.`,
            type: 'success',
            speed: 1000
          });
          this.cleanForm();
          await this.loadMovies(1, 10);
          window.location.reload();
          return;
        }
        console.log('jjsjs', response)
      } catch (e) {
        notification.notify({
          title: "Error ☠️",
          duration: 5000,
          text: `${e.message}`,
          type: 'error',
          speed: 1000
        });
      }
    },
    async commentMovie(model) {
      this.formAddComment.idMovie = model.id
      await this.loadComments(1,10, model.id)
    },
    async editMovie(model) {
      this.formEditMovie.id = model.id
      this.formEditMovie.name = model.name
      this.formEditMovie.description = model.description
    },
    async deleteMovie(id) {
      try {
        const response = await this.removeMovies({
          id
        })
        if (response.status === 200 && response.data.data) {
          notification.notify({
            title: "Movie removed 🎉",
            duration: 5000,
            text: `Movie removed success.`,
            type: 'success',
            speed: 1000
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }
      } catch (e) {
        notification.notify({
          title: "Error ☠️",
          duration: 5000,
          text: `${e.message}`,
          type: 'error',
          speed: 1000
        });
      }
    },
    async saveMovie(){
      let validations = new MovieValidations(
          this.formEditMovie.name,
          this.formEditMovie.description
      )
      this.errors = validations.checkValidations();
      if ('name' in this.errors || 'description' in this.errors) {
        return false
      }
      try {
        if (this.formEditMovie.image === null) {
          delete this.formEditMovie.image
        }
        console.log('this.formEditMovieAAA', this.formEditMovie)
        const response = await this.updateMovie({
          id: this.formEditMovie.id,
          model: {
            ...this.formEditMovie
          }
        })
        if (response.status === 200) {
          notification.notify({
            title: "Movie modified 🎉",
            duration: 5000,
            text: `Movie modified success.`,
            type: 'success',
            speed: 1000
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }
      } catch (e) {
        notification.notify({
          title: "Error ☠️",
          duration: 5000,
          text: `${e.message}`,
          type: 'error',
          speed: 1000
        });
      }
    },
    async createComment(){
      console.log('ssjdjjd', this.formAddComment)
      let validations = new CommentValidations(
          this.formAddComment.comment,
          this.formAddComment.qualification
      )
      this.errors = validations.checkValidations();
      if ('comment' in this.errors || 'qualification' in this.errors) {
        return false
      }
      try {
        const response = await this.addComments(
            this.formAddComment
        )
        if (response.status === 200) {
          notification.notify({
            title: "Add comment 🎉",
            duration: 5000,
            text: `Comment add success.`,
            type: 'success',
            speed: 1000
          });
          await this.loadComments(1, 10, this.formAddComment.idMovie)
        }
      } catch (e) {
        notification.notify({
          title: "Error ☠️",
          duration: 5000,
          text: `${e.message}`,
          type: 'error',
          speed: 1000
        });
      }
    },
    async loadComments(page, limit, idMovie) {
      try {
        const response = await this.listComments({page, limit, idMovie})
        if (response.status === 200) {
          this.commentList = response.data.data.rows;
          this.currentPage = response.data.data.count;
        }
      } catch (e) {
        notification.notify({
          title: "Error ☠️",
          duration: 5000,
          text: `${e.message}`,
          type: 'error',
          speed: 1000
        });
      }
    }
  }
}
</script>